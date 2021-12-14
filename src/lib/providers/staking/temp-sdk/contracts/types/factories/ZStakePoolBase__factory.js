'use strict';
/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
Object.defineProperty(exports, '__esModule', { value: true });
exports.ZStakePoolBase__factory = void 0;
const ethers_1 = require('ethers');
const _abi = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'previousOwner',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'OwnershipTransferred',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'Paused',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: '_by',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint32',
				name: '_fromVal',
				type: 'uint32',
			},
			{
				indexed: false,
				internalType: 'uint32',
				name: '_toVal',
				type: 'uint32',
			},
		],
		name: 'PoolWeightUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: '_by',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'depositId',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint64',
				name: 'lockedFrom',
				type: 'uint64',
			},
			{
				indexed: false,
				internalType: 'uint64',
				name: 'lockedUntil',
				type: 'uint64',
			},
		],
		name: 'StakeLockUpdated',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: '_by',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: '_from',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'Staked',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: '_by',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'yieldRewardsPerWeight',
				type: 'uint256',
			},
			{
				indexed: false,
				internalType: 'uint64',
				name: 'lastYieldDistribution',
				type: 'uint64',
			},
		],
		name: 'Synchronized',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: false,
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
		],
		name: 'Unpaused',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: '_by',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: '_to',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'Unstaked',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: '_by',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'address',
				name: '_to',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'YieldClaimed',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_rewardToken',
				type: 'address',
			},
			{
				internalType: 'contract zStakePoolFactory',
				name: '_factory',
				type: 'address',
			},
			{
				internalType: 'address',
				name: '_poolToken',
				type: 'address',
			},
			{
				internalType: 'uint64',
				name: '_initBlock',
				type: 'uint64',
			},
			{
				internalType: 'uint32',
				name: '_weight',
				type: 'uint32',
			},
		],
		name: '__zStakePoolBase__init',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
		],
		name: 'balanceOf',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'blockNumber',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_rewardLockPeriod',
				type: 'uint256',
			},
		],
		name: 'changeRewardLockPeriod',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'factory',
		outputs: [
			{
				internalType: 'contract zStakePoolFactory',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
			{
				internalType: 'uint256',
				name: '_depositId',
				type: 'uint256',
			},
		],
		name: 'getDeposit',
		outputs: [
			{
				components: [
					{
						internalType: 'uint256',
						name: 'tokenAmount',
						type: 'uint256',
					},
					{
						internalType: 'uint256',
						name: 'weight',
						type: 'uint256',
					},
					{
						internalType: 'uint64',
						name: 'lockedFrom',
						type: 'uint64',
					},
					{
						internalType: 'uint64',
						name: 'lockedUntil',
						type: 'uint64',
					},
					{
						internalType: 'bool',
						name: 'isYield',
						type: 'bool',
					},
				],
				internalType: 'struct IPool.Deposit',
				name: '',
				type: 'tuple',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_user',
				type: 'address',
			},
		],
		name: 'getDepositsLength',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'isFlashPool',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'lastYieldDistribution',
		outputs: [
			{
				internalType: 'uint64',
				name: '',
				type: 'uint64',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'now256',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'paused',
		outputs: [
			{
				internalType: 'bool',
				name: '',
				type: 'bool',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '_staker',
				type: 'address',
			},
		],
		name: 'pendingYieldRewards',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'poolToken',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'processRewards',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'renounceOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'rewardLockPeriod',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'reward',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'rewardPerWeight',
				type: 'uint256',
			},
		],
		name: 'rewardToWeight',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'pure',
		type: 'function',
	},
	{
		inputs: [],
		name: 'rewardToken',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint32',
				name: '_weight',
				type: 'uint32',
			},
		],
		name: 'setWeight',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256',
			},
			{
				internalType: 'uint64',
				name: '_lockUntil',
				type: 'uint64',
			},
		],
		name: 'stake',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'sync',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: 'newOwner',
				type: 'address',
			},
		],
		name: 'transferOwnership',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_depositId',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: '_amount',
				type: 'uint256',
			},
		],
		name: 'unstake',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'depositId',
				type: 'uint256',
			},
			{
				internalType: 'uint64',
				name: 'lockedUntil',
				type: 'uint64',
			},
		],
		name: 'updateStakeLock',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		name: 'users',
		outputs: [
			{
				internalType: 'uint256',
				name: 'tokenAmount',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'totalWeight',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'subYieldRewards',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'usersLockingWeight',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'weight',
		outputs: [
			{
				internalType: 'uint32',
				name: '',
				type: 'uint32',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: '_weight',
				type: 'uint256',
			},
			{
				internalType: 'uint256',
				name: 'rewardPerWeight',
				type: 'uint256',
			},
		],
		name: 'weightToReward',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'pure',
		type: 'function',
	},
	{
		inputs: [],
		name: 'yieldRewardsPerWeight',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
];
class ZStakePoolBase__factory {
	static createInterface() {
		return new ethers_1.utils.Interface(_abi);
	}
	static connect(address, signerOrProvider) {
		return new ethers_1.Contract(address, _abi, signerOrProvider);
	}
}
exports.ZStakePoolBase__factory = ZStakePoolBase__factory;
ZStakePoolBase__factory.abi = _abi;
//# sourceMappingURL=ZStakePoolBase__factory.js.map