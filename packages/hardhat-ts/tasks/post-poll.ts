import { task } from 'hardhat/config';
import { LensHub__factory } from '../typechain-types';
import { PostDataStruct } from '../typechain-types/LensHub';
import { getAddrs, initEnv, waitForTx, ZERO_ADDRESS } from './helpers/utils';

task('post-poll', 'publishes a custom post(poll)').setAction(async ({}, hre) => {
  const [governance, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const emptyCollectModuleAddr = addrs['empty collect module'];
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);

  await waitForTx(lensHub.whitelistCollectModule(emptyCollectModuleAddr, true));

  const inputStruct: PostDataStruct = {
    profileId: 1,
    contentURI:
      '{ "question": "how old are you?", "answers": ["5", "10", "40"] }',
    collectModule: emptyCollectModuleAddr,
    collectModuleData: [],
    referenceModule: ZERO_ADDRESS,
    referenceModuleData: [],
  };

  await waitForTx(lensHub.connect(user).post(inputStruct));
  console.log(await lensHub.getPub(1, 2));
});
