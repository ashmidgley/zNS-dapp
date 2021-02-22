import React, { FC, useCallback, useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { useZnsContracts } from '../../../lib/contracts';
import {
  domainCacheContext,
  useDomainCache,
} from '../../../lib/useDomainCache';
import { domain } from 'process';
import Approve from '../../table/NFT-View/approval';

const Owned: FC = () => {
  const context = useWeb3React<Web3Provider>();

  const contracts = useZnsContracts();
  const { library, account, active, chainId } = context;

  const { owned } = useDomainCache();

  const gridCell = () => {
    return (
      <div className="Cellgrid">
        <div className="Topcell"> domains </div>
        <div className="Bottomcell">
          <div className="TextTopcell"></div>
          <div className="TextMiddlecell">Price of Domain</div>
          <div className="TextBottomcell">
            <span>Left</span>
            <span>
              <button> transfer Modal</button>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const ownedCells = [];

  if (owned.isJust()) {
    owned.map((own) => {
      ownedCells.push(gridCell());
    });
  }

  const cells: any = [];
  cells.push(gridCell());
  cells.push(gridCell());
  cells.push(gridCell());
  cells.push(gridCell());
  cells.push(gridCell());
  cells.push(gridCell());
  cells.push(gridCell());
  cells.push(gridCell());

  if (owned.isNothing()) return <p>User owns no domains.</p>;

  return (
    <>
      <div className="gridContainer-profile">{cells}</div>
    </>
  );
};

export default Owned;
