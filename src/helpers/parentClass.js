export default function hasSomeParentTheClass(element, classname) {
    if (element.className.split(' ').indexOf(classname)>=0) return true;
    console.log(element.parentNode)
    return element.parentNode && hasSomeParentTheClass(element.parentNode, classname);
}