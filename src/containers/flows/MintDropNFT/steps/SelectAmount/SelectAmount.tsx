// React Imports
import { FormEvent, useState } from 'react';

// Component Imports
import { FutureButton, TextInput } from 'components';

// Style Imports
import styles from './SelectAmount.module.scss';

// Library Imports

type SelectAmountProps = {
	balanceEth: number;
	error?: string;
	maxPurchasesPerUser?: number;
	numberPurchasedByUser: number;
	onBack: () => void;
	onContinue: (numWheels: number) => void;
	remainingWheels: number;
	pricePerNFT: number;
};

const SelectAmount = (props: SelectAmountProps) => {
	//////////////////
	// State & Data //
	//////////////////

	const remainingUserWheels =
		props.maxPurchasesPerUser !== undefined
			? props.maxPurchasesPerUser - props.numberPurchasedByUser
			: props.remainingWheels;
	const maxUserCanAfford = Math.floor(props.balanceEth / props.pricePerNFT);

	const maxWheelsRemaining = Math.min(
		remainingUserWheels,
		props.remainingWheels,
	);
	const maxUserCanBuy = Math.min(maxUserCanAfford, maxWheelsRemaining);
	const [amount, setAmount] = useState<string | undefined>();

	const [hasUserAcceptedTerms, setHasUserAcceptedTerms] =
		useState<boolean>(false);

	// Input errors
	const [inputError, setInputError] = useState<string | undefined>();
	const [showTermsError, setShowTermsError] = useState<boolean>(false);

	// We should never hit this, but just in case
	// there are no wheels remaining
	// or the user has 0 eth but somehow snuck through
	if (props.remainingWheels <= 0 || props.balanceEth < props.pricePerNFT) {
		props.onBack();
	}

	///////////////
	// Functions //
	///////////////

	const onInputChange = (amount: string) => {
		setAmount(amount);
	};

	const formSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isAmountValid()) {
			if (!hasUserAcceptedTerms) {
				setShowTermsError(true);
				setInputError(undefined);
			} else {
				props.onContinue(Number(amount));
			}
		} else {
			if (isNaN(Number(amount))) {
				setInputError('Please enter a valid number');
				return;
			}
			const numWheels = Number(amount);
			if (
				numWheels <= 0 ||
				(Boolean(props.maxPurchasesPerUser) &&
					numWheels > props.maxPurchasesPerUser!)
			) {
				setInputError(
					`Please enter a number between 1 & ${props.maxPurchasesPerUser}`,
				);
			} else if (numWheels * props.pricePerNFT > props.balanceEth) {
				setInputError(`You do not have enough ETH to mint ${numWheels} Kicks`);
			} else if (
				numWheels > remainingUserWheels &&
				Boolean(props.maxPurchasesPerUser)
			) {
				setInputError(
					`You have already minted ${props.numberPurchasedByUser}/${props.maxPurchasesPerUser} of the maximum allowed Kicks. Please choose a lower number`,
				);
			} else if (numWheels > props.remainingWheels) {
				if (props.remainingWheels === 1) {
					setInputError(`There is only 1 pair of Kicks left in this drop`);
				} else {
					setInputError(
						`There are only ${props.remainingWheels} Kicks left in this drop`,
					);
				}
			}
		}
	};

	const toggleAcceptTerms = (event: any) => {
		setHasUserAcceptedTerms(!hasUserAcceptedTerms);
	};

	const isAmountValid = () => {
		return (
			amount !== undefined &&
			amount.length > 0 &&
			!isNaN(Number(amount)) &&
			Number(amount) % 1 === 0 &&
			Number(amount) <= maxUserCanBuy
		);
	};

	////////////
	// Render //
	////////////

	return (
		<section>
			{(!props.maxPurchasesPerUser ||
				props.numberPurchasedByUser < props.maxPurchasesPerUser) && (
				<form onSubmit={formSubmit}>
					<p>
						How many Kicks would you like to Mint? The number you enter will be
						minted in one transaction, saving on GAS fees. Each pair of Kicks
						costs <b>{props.pricePerNFT} ETH</b>.
					</p>
					<TextInput
						onChange={onInputChange}
						placeholder={`Number of Kicks ${
							Boolean(props.maxPurchasesPerUser)
								? `(Maximum of ${props.maxPurchasesPerUser})`
								: ''
						}`}
						numeric
						text={amount}
					/>

					<div className={styles.Terms}>
						<div
							onClick={toggleAcceptTerms}
							className={hasUserAcceptedTerms ? styles.Selected : ''}
						></div>
						<input
							type="radio"
							id="termsAndConditions"
							name="terms"
							value="terms"
							checked={hasUserAcceptedTerms}
							onClick={toggleAcceptTerms}
							readOnly
						/>
						<label className="no-select" htmlFor="termsAndConditions">
							I agree to the auction{' '}
							<a
								href="https://zine.wilderworld.com/terms-and-conditions/"
								className="text-button"
								target="_blank"
								rel="noreferrer"
							>
								terms and conditions
							</a>
						</label>
					</div>

					{props.error !== undefined &&
						inputError === undefined &&
						!showTermsError && (
							<span className={styles.Error}>{props.error}</span>
						)}
					{inputError !== undefined && (
						<span className={styles.Error}>{inputError}</span>
					)}
					{showTermsError && !inputError && (
						<span className={styles.Error}>
							Please accept the terms and conditions to continue
						</span>
					)}
					<FutureButton glow className={styles.Button} onClick={() => {}}>
						Continue
					</FutureButton>
				</form>
			)}
			{props.maxPurchasesPerUser !== undefined &&
				props.numberPurchasedByUser >= props.maxPurchasesPerUser && (
					<p className={styles.Green} style={{ textAlign: 'center' }}>
						You have already minted {props.numberPurchasedByUser}/
						{props.maxPurchasesPerUser} Kicks
					</p>
				)}
		</section>
	);
};

export default SelectAmount;
