import { GenericTable } from 'components';
import StakePoolTableRow from './StakePoolTableRow';

import { useStaking } from 'lib/providers/staking/StakingSDKProvider';

import styles from './StakePoolTable.module.scss';

import { TABLE_HEADERS } from './StakePoolTable.helpers';

const StakePoolTable = () => {
	const staking = useStaking();

	const pools = staking.pools ? Object.values(staking.pools) : undefined;

	console.log(pools);

	return (
		<GenericTable
			alignments={[0, 0, 1, 1, 1, 1, 1]}
			className={styles.Table}
			data={pools}
			headers={TABLE_HEADERS}
			isLoading={pools === undefined}
			itemKey={'id'}
			loadingText={'Loading Stake Pools'}
			rowComponent={StakePoolTableRow}
		/>
	);
};

export default StakePoolTable;
