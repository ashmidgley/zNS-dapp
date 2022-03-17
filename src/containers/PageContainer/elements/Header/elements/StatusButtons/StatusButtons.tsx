import React, { useMemo } from 'react';
import {
	MintPreview,
	TransferPreview,
	TooltipLegacy,
	NumberButton,
} from 'components';

type StatusButtonsProps = {
	statusCounts: {
		minting: number;
		minted: number;
		stakeRequesting: number;
		stakeRequested: number;
		transferring: number;
	};
	onOpenProfile: () => void;
};

export const StatusButtons: React.FC<StatusButtonsProps> = ({
	statusCounts,
	onOpenProfile,
}) => {
	const { showStatusButton, showTransferringButton, statusCount } =
		useMemo(() => {
			const { minting, minted, stakeRequesting, stakeRequested, transferring } =
				statusCounts;

			const showStatusButton =
				minting + minted + stakeRequesting + stakeRequested > 0;
			const statusCount = minting + stakeRequesting;
			const showTransferringButton = transferring > 0;

			return {
				showStatusButton,
				showTransferringButton,
				statusCount,
			};
		}, [statusCounts]);

	return (
		<>
			{/* Status / Long Running Operation Button */}
			{showStatusButton && (
				<TooltipLegacy content={<MintPreview onOpenProfile={onOpenProfile} />}>
					<NumberButton rotating={statusCount > 0} number={statusCount} />
				</TooltipLegacy>
			)}

			{/* Transfer Progress button */}
			{showTransferringButton && (
				<TooltipLegacy content={<TransferPreview />}>
					<NumberButton
						rotating={statusCounts.transferring > 0}
						number={statusCounts.transferring}
					/>
				</TooltipLegacy>
			)}
		</>
	);
};
