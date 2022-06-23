//- Constants Imports
import {
	TITLE,
	SUBTEXT,
} from 'containers/ServicePageContainer/ServicePageContentContainer/ServicePageContentContainer.constants';

//- Container Imports
import ServicePageContentContainer from 'containers/ServicePageContainer/ServicePageContentContainer/ServicePageContentContainer';

//- Utils Imports
import { getLinkText } from './Maintenance.utils';

//- Styles Imports
import styles from './Maintenance.module.scss';

type MaintenanceProps = { onClick: () => void };

const Maintenance: React.FC<MaintenanceProps> = ({ onClick }) => {
	const linkText = getLinkText();

	return (
		<ServicePageContentContainer onClick={onClick}>
			<div className={styles.HeadingContainer}>
				<h1>{TITLE.MAINTENANCE}</h1>
			</div>

			<div className={styles.SubTextContainer}>
				<p>{SUBTEXT.MAINTENANCE}</p>
			</div>

			<div className={styles.LinkText}>{linkText}</div>
		</ServicePageContentContainer>
	);
};

export default Maintenance;
