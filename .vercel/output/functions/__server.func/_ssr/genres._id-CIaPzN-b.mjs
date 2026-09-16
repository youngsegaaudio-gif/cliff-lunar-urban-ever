import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { m as isGenreId, n as Route } from "./router-D9gwthdb.mjs";
import { t as GenreDetailPage } from "./genres-page-4LoHOL1J.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/genres._id-CIaPzN-b.js
var import_jsx_runtime = require_jsx_runtime();
function GenreDetail() {
	const { id } = Route.useParams();
	if (!isGenreId(id)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GenreDetailPage, { id });
}
//#endregion
export { GenreDetail as component };
