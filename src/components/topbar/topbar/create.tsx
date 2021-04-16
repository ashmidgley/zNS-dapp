import React, { useCallback, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { useZnsContracts } from '../../../lib/contracts';
import * as z from 'zod';
import { zodResolver } from '../../../lib/validation/zodResolver';
import { useForm } from 'react-hook-form';
import { subdomainRegex } from '../../../lib/validation/validators';
import { DomainContext } from '../../../lib/useDomainStore';
import { Modal, Button, Input } from 'antd';
import styles from '../../TextInput/TextInput.module.css';

import MintNewNFTStyle from '../../MintNewNFT/MintNewNFT.module.css';
import FutureButton from '../../Buttons/FutureButton/FutureButton.js';
import TextInput from '../../TextInput/TextInput.js';
import { ethers } from 'ethers';

interface CreateProps {
  domainId: string;
  domainContext: DomainContext;
  props: any;
}

const schema = z.object({
  child: z
    .string()
    .regex(subdomainRegex, 'Subdomain must only contain alphanumeric letters'),
});

const Create: React.FC<CreateProps> = ({ domainId, domainContext, props }) => {
  const { refetchDomain, name } = domainContext;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [isSubdomainVisible, setSubdomainVisible] = useState(false);
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [imageUrl, setImageUrl] = useState('ipfs://Qmimage');
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, handleSubmit, errors } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  // TODO: show user what they're doing wrong
  useEffect(() => console.log(errors), [errors]);
  const context = useWeb3React<Web3Provider>();
  const { account } = context;
  const contracts = useZnsContracts();

  // const [nftName, setName] = useState('');
  // const [nftStory, setStory] = useState('');

  // const mintNft = async (child: string) => {
  //   if (account && contracts.isJust() && name.isJust()) {
  //     console.log('if statement');
  //     await contracts.value.registry
  //       .registerDomain(
  //         name.value.name === '' ? child : name.value.id + '.' + child,
  //         name.value.id,
  //         account,
  //         account,
  //       )
  //       .then((txr: any) => {
  //         console.log('contract call');
  //         txr.wait(1);
  //       })
  //       .then(() => {
  //         console.log('refetch domain');
  //         refetchDomain();
  //       });
  //   }
  // };

  const _create = useCallback(
    (child: string) => {
      if (account && contracts.isJust() && name.isJust()) {
        console.log('if statement');
        contracts.value.registry
          .registerDomain(
            name.value.name === '' ? child : name.value.id + '.' + child,
            name.value.id,
            account,
            account,
          )
          .then((txr: any) => {
            console.log('contract call');
            txr.wait(1);
          })
          .then(() => {
            console.log('refetch domain');
            refetchDomain();
          });
      }
    },
    [account, contracts, name, refetchDomain],
  );

  if (name.isNothing() || account !== account) return null;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const showSubdomain = () => {
  //   setSubdomainVisible(true);
  // };

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const subdomainOk = () => {
  //   setSubdomainVisible(false);
  // };

  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const subdomainCancel = () => {
  //   setSubdomainVisible(false);
  // };

  // const someEventThatHappensWhenYouClickContinue = () => {
  //   // console.log(nftName, nftStory);
  // };

  return (
    <>
      {/* <button
        style={{ color: 'white' }}
        className="owned-btn"
        onClick={showSubdomain}
      >
        Create domain
      </button> */}
      {/* <Modal
        title="subdomain"
        visible={isSubdomainVisible}
        onOk={subdomainOk}
        onCancel={subdomainCancel}
        footer={null}
      > */}

      <form className={MintNewNFTStyle.Section}>
        <div style={{ display: 'flex' }}>
          <div className={MintNewNFTStyle.Inputs}>
            <input
              className={`${styles.TextInput} border-blue`}
              style={{
                ...props.style,
                resize: props.resizable ? 'vertical' : 'none',
              }}
              placeholder={'name'}
              name={'input'}
              ref={register}
            />
            <button
              type="submit"
              onSubmit={handleSubmit(({ child }) => _create(child))}
            >
              {' '}
              Mint NFT
            </button>
            {/* <TextInput
              multiline={true}
              placeholder={'Story'}
              style={{ height: 146, marginTop: 24 }}
              onChange={(text: string) => setStory(text)}
            /> */}
          </div>
          <div
            className={`${MintNewNFTStyle.NFT} border-rounded`}
            // Template background for now
            style={{ backgroundImage: `url(assets/nft/redpill.png)` }}
          ></div>
        </div>
      </form>

      {/* <FutureButton
        glow
        style={{ margin: '47px auto 0 auto' }}
        // onClick={someEventThatHappensWhenYouClickContinue}
        type="submit"
        onSubmit={handleSubmit(({ child }) => _create(child))}
      >
        Continue
      </FutureButton> */}

      {/* <div className="create-button">
      
        <input
          className={`${styles.TextInput} border-blue`}
          style={{
            ...props.style,
            resize: props.resizable ? 'vertical' : 'none',
          }}
          placeholder={props.placeholder}
          name={'child'}
          ref={register}
        />
      </div> */}
      {/* </Modal> */}
    </>
  );
};

export default Create;
