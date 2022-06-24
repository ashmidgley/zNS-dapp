//- React Imports
import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

//- Library Imports
import { formatNumber, formatEthers, zNAFromPathname } from 'lib/utils';

//- Style Imports
import styles from './ZNS.module.scss';

//- Components & Containers
import { StatsWidget } from 'components';
import { NFTViewModalProvider } from 'containers/other/NFTView/providers/NFTViewModalProvider/NFTViewModalProvider';
import PageContainer from 'containers/PageContainer';
import { SubdomainTable, CurrentDomainPreview, Raffle } from 'containers';
import { NFTView, TransferOwnership } from 'containers';

//- Library Imports
import { useCurrentDomain } from 'lib/providers/CurrentDomainProvider';
import { DomainMetrics } from '@zero-tech/zns-sdk/lib/types';
import { ethers } from 'ethers';
import useCurrency from 'lib/hooks/useCurrency';
import useMatchMedia from 'lib/hooks/useMatchMedia';
import { useDidMount } from 'lib/hooks/useDidMount';
import { useNavbar } from 'lib/hooks/useNavbar';
import { useZnsSdk } from 'lib/hooks/sdk';

//- Constants Imports
import { ROUTES } from 'constants/routes';

type ZNSProps = {
	version?: number;
	isNftView?: boolean;
};

enum Modal {
	Bid,
	Mint,
	Transfer,
	Wallet,
}

// @TODO: Rewrite this whole page

const ZNS: React.FC<ZNSProps> = () => {
	const isMounted = useRef<boolean>();

	///////////////////
	// Web3 Handling //
	///////////////////
	const { wildPriceUsd } = useCurrency();

	//- Domain Data
	const { domain: znsDomain, domainRaw: domain } = useCurrentDomain();

	////////////////////////
	// Browser Navigation //
	////////////////////////

	const isMobile = useMatchMedia('phone');
	const isMobilePortrait = useMatchMedia('(max-width: 569px)');

	const enableBanner = false;

	const sdk = useZnsSdk();
	const { push: goTo } = useHistory();
	const location = useLocation();
	const zna = zNAFromPathname(location.pathname);

	const nftView = useMemo(
		() => location.search.includes('view=true'),
		[location.search],
	);

	//- Page State
	const [hasLoaded, setHasLoaded] = useState(false);
	const [showDomainTable, setShowDomainTable] = useState(true);
	const [isNftView, setIsNftView] = useState(nftView === true);

	//- Overlay State
	const [modal, setModal] = useState<Modal | undefined>();
	const [tradeData, setTradeData] = useState<DomainMetrics | undefined>();
	const [statsLoaded, setStatsLoaded] = useState(false);

	///////////
	// Hooks //
	///////////

	const { setNavbarTitle } = useNavbar();

	useDidMount(() => {
		setNavbarTitle(undefined);
	});

	///////////////
	// Functions //
	///////////////

	const scrollToTop = () => {
		document.querySelector('body')?.scrollTo(0, 0);
	};

	/////////////////////
	// Overlay Toggles //
	/////////////////////
	const closeModal = () => {
		setModal(undefined);
	};

	const openTransferOwnershipModal = () => {
		setModal(Modal.Transfer);
	};

	const getTradeData = async () => {
		if (znsDomain) {
			const metricsData = await sdk.instance.getDomainMetrics([znsDomain.id]);
			if (metricsData && metricsData[znsDomain.id]) {
				setTradeData(metricsData[znsDomain.id]);
			}
			setStatsLoaded(true);
		}
	};

	/////////////
	// Effects //
	/////////////

	/* WIP */
	useEffect(() => {
		scrollToTop();
		setShowDomainTable(!isNftView);
	}, [isNftView]);

	/* Also WIP */
	useEffect(() => {
		setIsNftView(nftView === true);
	}, [nftView]);

	useEffect(() => {
		// TODO: Clean this whole hook up
		if (znsDomain) {
			// Set the domain data for table view
			setIsNftView(nftView === true || znsDomain.subdomains.length === 0);
			setHasLoaded(true);
		}
		window.scrollTo({
			top: -1000,
			behavior: 'smooth',
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [znsDomain, hasLoaded]);

	useEffect(() => {
		setStatsLoaded(false);
		if (znsDomain && znsDomain.id) {
			getTradeData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [znsDomain]);

	// Handle domains that don't exist
	useEffect(() => {
		isMounted.current = true;

		(async () => {
			if (!sdk) {
				return;
			}

			try {
				const allDomains = await sdk.instance.getAllDomains();
				const domainNames = allDomains.map((d) =>
					d.name.split('.').slice(1).join('.'),
				);
				if (!domainNames.includes(zna) || !domainNames.includes(domain)) {
					goTo(ROUTES.PAGE_NOT_FOUND);
				}
			} catch (e) {
				console.error(e);
			}
		})();
		return () => {
			isMounted.current = false;
		};
	}, [domain, goTo, sdk, zna]);

	/////////////////////
	// React Fragments //
	/////////////////////

	const nftStats = () => {
		let width = '32%';
		if (isMobilePortrait) {
			width = '100%';
		}

		const data = [
			{
				fieldName: 'Items in Domain',
				title: tradeData?.items ? formatNumber(tradeData.items) : 0,
				isHidden: isMobilePortrait,
			},
			{
				fieldName: 'Floor Price',
				title: `${
					tradeData?.lowestSale ? formatEthers(tradeData?.lowestSale) : 0
				} WILD`,
				subTitle:
					wildPriceUsd > 0
						? `$${
								tradeData?.lowestSale
									? formatNumber(
											Number(ethers.utils.formatEther(tradeData?.lowestSale)) *
												wildPriceUsd,
									  )
									: 0
						  }`
						: '',
			},
			{
				fieldName: 'Volume',
				title: (tradeData?.volume as any)?.all
					? `${formatEthers((tradeData?.volume as any)?.all)} WILD`
					: '',
				subTitle:
					wildPriceUsd > 0
						? `$${
								(tradeData?.volume as any)?.all
									? formatNumber(
											Number(
												ethers.utils.formatEther(
													(tradeData?.volume as any)?.all,
												),
											) * wildPriceUsd,
									  )
									: 0
						  }`
						: '',
			},
		];

		return (
			<>
				<div className={styles.Stats}>
					{data.map(
						(item, index) =>
							!item.isHidden && (
								<div
									key={`stats-widget=${index}`}
									className={styles.WidgetContainer}
									style={{
										width: width,
									}}
								>
									<StatsWidget
										className="normalView"
										fieldName={item.fieldName}
										isLoading={!statsLoaded}
										title={item.title}
										subTitle={item.subTitle}
									></StatsWidget>
								</div>
							),
					)}
				</div>
			</>
		);
	};

	const previewCard = () => {
		const isVisible = domain !== '' && !isNftView;

		return isVisible ? <CurrentDomainPreview /> : <></>;
	};

	////////////
	// Render //
	////////////

	return (
		<>
			<PageContainer>
				{/* TODO: Convert page width into a hook to add condition here */}
				{modal === Modal.Transfer && (
					<TransferOwnership
						metadataUrl={znsDomain?.metadata ?? ''}
						domainName={domain}
						domainId={znsDomain?.id ?? ''}
						onTransfer={closeModal}
						creatorId={znsDomain?.minter?.id || ''}
						ownerId={znsDomain?.owner?.id || ''}
					/>
				)}
				{/* ZNS Content */}
				{enableBanner && <Raffle />}
				{!isNftView && (
					<div className="main">
						{previewCard()}
						{!(isMobile || isMobilePortrait) && nftStats()}
						{showDomainTable && (
							<div className={styles.TableContainer}>
								<SubdomainTable />
							</div>
						)}
					</div>
				)}
				{znsDomain && isNftView && (
					<NFTViewModalProvider>
						<NFTView
							// domain={domain}
							onTransfer={openTransferOwnershipModal}
						/>
					</NFTViewModalProvider>
				)}
			</PageContainer>
		</>
	);
};

export default ZNS;
