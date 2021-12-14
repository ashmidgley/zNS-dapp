import { Overlay } from 'components';
import { StakeFlow, StakingContainer, StakePool } from 'containers/staking';
import StakingProvider from 'lib/providers/staking/StakingProvider';
import { BrowserRouter } from 'react-router-dom';

const Staking = () => {
	return (
		<BrowserRouter>
			<StakingProvider>
				<StakingContainer />
			</StakingProvider>
		</BrowserRouter>
	);
};

export default Staking;