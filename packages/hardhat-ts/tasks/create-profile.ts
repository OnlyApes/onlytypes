import { task } from 'hardhat/config';
import { LensHub__factory } from '../typechain-types';
import { CreateProfileDataStruct } from '../typechain-types/LensHub';
import { waitForTx, initEnv, getAddrs, ZERO_ADDRESS } from './helpers/utils';

task('create-profile', 'creates a profile').setAction(async ({}, hre) => {
  const [governance, , user, user2] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);

  await waitForTx(lensHub.whitelistProfileCreator(user.address, true));

  const inputStruct: CreateProfileDataStruct = {
    to: user.address,
    handle: 'zer0dot',
    imageURI:
      'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
    followModule: ZERO_ADDRESS,
    followModuleData: [],
    followNFTURI:
      'https://ipfs.fleek.co/ipfs/ghostplantghostplantghostplantghostplantghostplantghostplan',
  };

    await waitForTx(lensHub.connect(user).createProfile(inputStruct));

    console.log(`Total supply (should be 1): ${await lensHub.totalSupply()}`);
    console.log(
      `Profile owner: ${await lensHub.ownerOf(1)}, user address (should be the same): ${user.address}`
    );
    console.log(`Profile ID by handle: ${await lensHub.getProfileIdByHandle('zer0dot')}`);

    await waitForTx(lensHub.whitelistProfileCreator(user2.address, true));

    const inputStructAdd: CreateProfileDataStruct = {
      to: user2.address,
      handle: 'tw0dot',
      imageURI: 'https://hotbabes.com',
      followModule: ZERO_ADDRESS,
      followModuleData: [],
      followNFTURI: 'https://hotbabes.com',
    };

    await waitForTx(lensHub.connect(user2).createProfile(inputStructAdd));

    console.log(`Total supply (should be 2): ${await lensHub.totalSupply()}`);
    console.log(
      `Profile owner: ${await lensHub.ownerOf(2)}, user address (should be the same): ${user2.address}`
    );
    console.log(`Profile ID by handle: ${await lensHub.getProfileIdByHandle('tw0dot')}`);
});
