import { Preferences } from '@capacitor/preferences';

class CapacitorTest {

 public  setName = async () => {
  await Preferences.set({
    key: 'name',
    value: 'Max',
  });
};

public checkName = async () => {
  const { value } = await Preferences.get({ key: 'name' });

  console.log(`Hello ${value}!`);
};

 public  removeName = async () => {
  await Preferences.remove({ key: 'name' });
};
}
export default CapacitorTest;