import { task } from 'hardhat/config';
import { LensHub__factory } from '../typechain-types';
import { CreateProfileDataStruct } from '../typechain-types/LensHub';
import { waitForTx, initEnv, getAddrs, ZERO_ADDRESS } from './helpers/utils';

task('whitelist-profile-creator', 'whitelists a profile creator address').setAction(async ({}, hre) => {
  const [governance, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);

  const addr = '0x90F79bf6EB2c4f870365E785982E1f101E93b906';
  await waitForTx(lensHub.whitelistProfileCreator(addr, true));
  console.log(addr, ' is whitelisted? ', await lensHub.isProfileCreatorWhitelisted(addr));
});
