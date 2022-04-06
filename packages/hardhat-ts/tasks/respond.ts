import { task } from 'hardhat/config';
import { LensHub__factory } from '../typechain-types';
import { CommentDataStruct } from '../typechain-types/LensHub';
import { getAddrs, initEnv, waitForTx, ZERO_ADDRESS } from './helpers/utils';

task('respond', 'respond to a poll').setAction(async ({}, hre) => {
  const [governance, , user, user2] = await initEnv(hre);
  const addrs = getAddrs();
  const emptyCollectModuleAddr = addrs['empty collect module'];
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);
  const uri = '{ "reponse": ["40"] }'

  await waitForTx(lensHub.whitelistCollectModule(emptyCollectModuleAddr, true));

  const inputStruct: CommentDataStruct = {
    profileId: 1,
    contentURI: uri,
    profileIdPointed: 1,
    pubIdPointed: 2,
    collectModule: emptyCollectModuleAddr,
    collectModuleData: [],
    referenceModule: ZERO_ADDRESS,
    referenceModuleData: [],
  };

  const tx = await waitForTx(lensHub.connect(user).comment(inputStruct));

  console.log(await lensHub.getPub(1,1));
});
