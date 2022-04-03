import { task } from 'hardhat/config';
import { LensHub__factory } from '../typechain-types';
import { PostDataStruct } from '../typechain-types/LensHub';
import { getAddrs, initEnv, waitForTx, ZERO_ADDRESS } from './helpers/utils';

task('view-poll', 'view poll').setAction(async ({}, hre) => {
  const [governance, , user, user2] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);

  console.log(await lensHub.getPub(1, 2));
});
