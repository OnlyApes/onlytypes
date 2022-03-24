import { task } from 'hardhat/config';
import { LensHub__factory } from '../typechain-types';
import { CreateProfileDataStruct } from '../typechain-types/LensHub';
import { waitForTx, initEnv, getAddrs, ZERO_ADDRESS } from './helpers/utils';

task('whitelist-profile-creator', 'whitelists a profile creator address').setAction(async ({}, hre) => {
  const [governance, , user] = await initEnv(hre);
  const addrs = getAddrs();
  const lensHub = LensHub__factory.connect(addrs['lensHub proxy'], governance);

  const addr = '0x71B33F134342043d7C10C7871c31d9451EB45a4E';
  await waitForTx(lensHub.whitelistProfileCreator(addr, true));
  console.log(addr, ' is whitelisted? ', await lensHub.isProfileCreatorWhitelisted(addr));
});

