import { task } from 'hardhat/config';
import { LensHub__factory, CollectNFT__factory } from '../typechain-types';
import { getAddrs, initEnv, waitForTx } from './helpers/utils';

task('collect-poll', 'collects a post').setAction(async ({}, hre) => {
  const [, , user, user2] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], user2);

  await waitForTx(lensHub.collect(1, 2, []));

  const collectNFTAddr = await lensHub.getCollectNFT(1, 2);
  const collectNFT = CollectNFT__factory.connect(collectNFTAddr, user2);

  const publicationContentURI = await lensHub.getContentURI(1, 2);
  const totalSupply = await collectNFT.totalSupply();
  const ownerOf = await collectNFT.ownerOf(1);
  const collectNFTURI = await collectNFT.tokenURI(1);

  console.log(`Collect NFT total supply (should be 1): ${totalSupply}`);
  console.log(
    `Collect NFT owner of ID 1: ${ownerOf}, user address (should be the same): ${user2.address}`
  );
  console.log(
    `Collect NFT URI: ${collectNFTURI}, publication content URI (should be the same): ${publicationContentURI}`
  );
});
