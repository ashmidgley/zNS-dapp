import { FutureButton } from 'components';
import { StakeModule } from 'containers/staking';

import { PoolData, Message, Back } from '../../..';

import styles from './Claim.module.scss';

type StakeProps = {
	apy: number;
	totalValueLocked: number;
	message: { error?: boolean; content: string } | undefined;
	poolIconUrl: string;
	poolName: string;
	poolDomain: string;
	onBack: () => void;
	onClaim: (amount: number) => void;
	isTransactionPending?: boolean;
	rewardAmount: number;
};

const Claim = (props: StakeProps) => {
	const {
		apy,
		totalValueLocked,
		message,
		poolIconUrl,
		poolName,
		poolDomain,
		onBack,
		onClaim,
		isTransactionPending,
		rewardAmount,
	} = props;

	return (
		<div className={styles.Container}>
			<Back onBack={onBack} text={'All Pools'} />
			{message && <Message message={message.content} error={message.error} />}
			<PoolData
				domain={poolDomain}
				name={poolName}
				image={poolIconUrl}
				id={'123'}
				poolUrl={'https://youtube.com/'}
				apy={apy}
				totalValueLocked={totalValueLocked}
			/>
			<FutureButton className="width-full" glow onClick={onClaim}>
				Claim {rewardAmount} WILD
			</FutureButton>
		</div>
	);
};

export default Claim;