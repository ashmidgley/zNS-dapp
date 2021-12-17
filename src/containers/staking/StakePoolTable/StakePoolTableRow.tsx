import { FutureButton } from 'components';
import { Artwork } from 'components';
import styles from './StakePoolTableRow.module.scss';
import { useHistory } from 'react-router';

// import { useStaking } from 'lib/providers/staking/StakingProvider';
import { useStakingPoolSelector } from 'lib/providers/staking/PoolSelectProvider';
import { WrappedStakingPool } from 'lib/providers/staking/StakingProviderTypes';
import { toFiat } from 'lib/currency';

const StakePoolTableRow = (props: any) => {
	// const { selectPoolByName } = useStaking();
	const { push } = useHistory();

	const selectPool = useStakingPoolSelector().selectStakePool;

	const pool = props.data as WrappedStakingPool;
	const apy = pool.metrics.apy;
	const tvl = pool.metrics.tvl.valueOfTokensUSD;

	const onRowClick = (event: React.MouseEvent<HTMLElement>) => {
		if ((event.target as HTMLElement).className.indexOf('FutureButton') < 0) {
			push(pool.content.domain);
		}
	};

	const onButtonClick = () => {
		selectPool(pool);
	};

	return (
		<tr className={styles.Row} onClick={onRowClick}>
			<td>{props.rowNumber + 1}</td>
			<td>
				<Artwork
					disableAnimation
					name={pool.content.name}
					image={pool.content.image}
					disableInteraction
					id={pool.content.domain}
					style={{ maxWidth: 200 }}
				/>
			</td>
			<td className={styles.Right}>
				{Number(apy.toFixed(2)).toLocaleString() + '%'}
			</td>
			<td className={styles.Right}>{'$' + toFiat(tvl)}</td>
			<td>
				<FutureButton glow onClick={onButtonClick}>
					Stake
				</FutureButton>
			</td>
		</tr>
	);
};

export default StakePoolTableRow;
