import { useWeb3React } from '@web3-react/core';
import { useContractAddresses } from 'lib/contracts';
import React, { useRef } from 'react';
import * as zfi from '@zero-tech/zfi-sdk';
import { Instance } from '@zero-tech/zfi-sdk/lib/types';
import { MaybeUndefined } from 'lib/types';
import {
	poolContent,
	WrappedStakingPool,
	WrappedStakingPools,
} from './StakingProviderTypes';
import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { RPC_URLS } from 'lib/connectors';
import { defaultNetworkId } from 'lib/network';

export const StakingContext = React.createContext({
	instance: undefined as MaybeUndefined<Instance>,
	pools: undefined as MaybeUndefined<WrappedStakingPools>,
	refetch: () => {},
});

type StakingProviderType = {
	children: React.ReactNode;
};

export const StakingSDKProvider: React.FC<StakingProviderType> = ({
	children,
}) => {
	const { library, chainId } = useWeb3React<Web3Provider>();
	const isMounted = useRef<boolean>();
	const contractAddresses = useContractAddresses();

	const [instance, setInstance] =
		React.useState<MaybeUndefined<Instance>>(undefined);
	const [pools, setPools] =
		React.useState<MaybeUndefined<WrappedStakingPools>>(undefined);

	///////////////
	// Functions //
	///////////////

	const getMetrics = async () => {
		if (!instance) {
			return;
		}

		const wildPool: WrappedStakingPool = {
			instance: instance.wildPool,
			content: poolContent.wildPool,
			metrics: {
				apy: await instance.wildPool.poolApr(),
				tvl: await instance.wildPool.poolTvl(),
			},
		};

		const lpPool: WrappedStakingPool = {
			instance: instance.liquidityPool,
			content: poolContent.lpPool,
			metrics: {
				apy: await instance.liquidityPool.poolApr(),
				tvl: await instance.liquidityPool.poolTvl(),
			},
		};

		const pools = {
			wildPool,
			lpPool,
		};

		if (isMounted?.current) {
			setPools(pools);
		}
	};

	const refetch = () => {
		getMetrics().catch((e) => {
			console.log(e.stack);
		});
	};

	/////////////
	// Effects //
	/////////////

	// Set is isMounted ref
	React.useEffect(() => {
		isMounted.current = true;
		return () => {
			isMounted.current = false;
		};
	}, []);

	React.useEffect(() => {
		refetch();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [instance]);

	React.useEffect(() => {
		if (!contractAddresses) {
			return;
		}

		let instance;

		if (chainId === 4) {
			instance = zfi.createInstance({
				wildPoolAddress: '0xE0Bb298Afc5dC12918d02732c824DA44e7D61E2a',
				lpTokenPoolAddress: '0xe7BEeedAf11eE695C4aE64A01b24F3F7eA294aB6',
				factoryAddress: '0xb1d051095B6b2f6C93198Cbaa9bb7cB2d607215C',
				provider:
					library ??
					new ethers.providers.JsonRpcProvider(
						'https://rinkeby.infura.io/v3/fa959ead3761429bafa6995a4b25397e',
						4,
					),
			});
			instance.wildPool
				.poolApr()
				.then((d) => console.log(d))
				.catch((e) => console.error('Staking SDK Error:', e));
		} else {
			instance = zfi.createInstance({
				wildPoolAddress: contractAddresses.wildStakingPool,
				lpTokenPoolAddress: contractAddresses.lpStakingPool,
				factoryAddress: contractAddresses.stakeFactory,
				provider:
					library ??
					new ethers.providers.JsonRpcProvider(RPC_URLS[defaultNetworkId]),
			});

			setInstance(instance);
		}
	}, [contractAddresses, library, chainId]);

	const contextValue = {
		instance,
		pools,
		refetch,
	};

	return (
		<StakingContext.Provider value={contextValue}>
			{children}
		</StakingContext.Provider>
	);
};

export function useStaking() {
	const context = React.useContext(StakingContext);

	return context;
}
