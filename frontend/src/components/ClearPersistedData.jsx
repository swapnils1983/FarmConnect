import { persistor } from '../redux/store'; // adjust path to where persistor is exported

function ClearPersistedData() {
  persistor.purge().then(() => {
    console.log('Persisted data cleared');
  })
}

export default ClearPersistedData;
