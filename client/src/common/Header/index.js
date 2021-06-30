import Loadable from 'react-loadable';
import Loader from '../Loader'

export default Loadable({
    loader: () => import("./Header"),
    loading: Loader,
});

