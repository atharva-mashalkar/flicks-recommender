import Loadable from 'react-loadable';
import Loader from '../../common/Loader'

export default Loadable({
    loader: () => import("./Login"),
    loading: Loader,
});

