import { task } from 'hardhat/config';
import { LensHub__factory, FollowNFT__factory } from '../typechain-types';
import { getAddrs, initEnv, waitForTx } from './helpers/utils';

task('follow', 'follows a profile').setAction(async ({}, hre) => {
  const [, , user, user2] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], user);

  await waitForTx(lensHub.follow([1], [[]]));

  const followNFTAddr = await lensHub.getFollowNFT(1);
  const followNFT = FollowNFT__factory.connect(followNFTAddr, user);

  const totalSupply = await followNFT.totalSupply();
  const ownerOf = await followNFT.ownerOf(1);

  console.log(`Follow NFT total supply (should be 1): ${totalSupply}`);
  console.log(
    `Follow NFT owner of ID 1: ${ownerOf}, user address (should be different): ${user.address}`
  );
});
