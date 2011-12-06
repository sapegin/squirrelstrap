/* © 2011 Artem Sapegin http://sapegin.ru */


/**
 * 
 */
document.documentElement.id = 'js';


/**
 * Initialize components
 *
 * <div data-component="pony"></div>
 */
function initComponents(funcs) {
	function getContainers() {
		if (document.querySelectorAll) {
			return document.querySelectorAll('[data-component]');
		}
		else {
			var elems = document.getElementsByTagName('*'),
				containers = [];
			for (var elemIdx = 0, elemCnt = elems.length; elemIdx < elemCnt; elemIdx++) {
				var elem = elems[elemIdx];
				if (elem.getAttribute('data-component')) {
					containers.push(elem);
				}
			}
			return containers;
		}
	}

	var containers = getContainers();
	for (var containerIdx = 0, containerCnt = containers.length; containerIdx < containerCnt; containerIdx++) {
		var container = containers[containerIdx],
			component = container.getAttribute('data-component');
		if (funcs[component]) {
			funcs[component](container);
		}
	}
}
