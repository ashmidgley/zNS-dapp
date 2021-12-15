import { useEffect, useMemo, useState } from 'react';

import Claim from './steps/Claim/Claim';
import { Confirm, Header } from '../';

import { useStaking } from 'lib/providers/staking/StakingProvider';

import styles from './ClaimFlow.module.scss';

import classNames from 'classnames/bind';
import { LoadingIndicator } from 'components';
import { ethers } from 'ethers';

enum Steps {
	Claim,
	Confirm,
	Processing,
}

const cx = classNames.bind(styles);

type StakeFlowProps = {
	onClose: () => void;
};

const StakeFlow = (props: StakeFlowProps) => {
	const { onClose } = props;
	const { checkRewards, claimRewards, selectedDeposit } = useStaking();

	const HEADER = <Header text="Claim Pool Rewards" />;

	const [rewardAmount, setRewardAmount] = useState<
		ethers.BigNumber | undefined
	>();
	const [step, setStep] = useState<Steps>(Steps.Claim);
	const [message, setMessage] = useState<
		{ content: string; error?: boolean } | undefined
	>();

	useEffect(() => {
		getRewardAmount();
	}, []);

	const getRewardAmount = async () => {
		const rewards = await checkRewards(selectedDeposit.pool.name);
		setRewardAmount(rewards);
	};

	const onClaim = () => {
		setStep(Steps.Confirm);
	};

	const onConfirm = () => {
		setStep(Steps.Processing);
		claimRewards(selectedDeposit.pool.name).then((d) => {
			setStep(Steps.Claim);
			setRewardAmount(undefined);
			getRewardAmount();
		});
	};

	const stepNode = () => {
		switch (step) {
			case Steps.Claim:
				return (
					<Claim
						apy={selectedDeposit.pool.apy}
						message={message}
						poolIconUrl={selectedDeposit.pool.image}
						poolName={selectedDeposit.pool.name}
						poolDomain={selectedDeposit.pool.domain}
						onBack={onClose}
						onClaim={onClaim}
						rewardAmount={rewardAmount}
					/>
				);
			case Steps.Confirm:
				return (
					<>
						{HEADER}
						<Confirm
							content={
								<>
									<p>
										When you claim pool rewards, they are staked in the WILD
										pool and can be unstaked after a 12 month vesting period.
									</p>
									<p>
										Are you sure you want to claim{' '}
										<b>{rewardAmount?.toString()} WILD</b> in pool rewards?
									</p>
								</>
							}
							hideCancel
							confirmText={'Confirm Claim'}
							onConfirm={onConfirm}
						/>
					</>
				);
			case Steps.Processing:
				return (
					<>
						{HEADER}
						<LoadingIndicator text={'Your transaction is being processed...'} />
					</>
				);

			default:
				return 'error';
		}
	};

	return (
		<div
			className={cx(
				styles.Container,
				'background-primary',
				'border-rounded',
				'border-primary',
			)}
		>
			{stepNode()}
		</div>
	);
};

export default StakeFlow;
