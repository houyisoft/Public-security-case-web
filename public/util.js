function addEvent(obj, name, func) {
    if (!obj) return;

    if (obj.attachEvent) {
        obj.attachEvent("on" + name, func);
    } else {
        obj.addEventListener(name, func, false);
    }
}

var requestIdleCallback = (function () {
    if (window.requestIdleCallback) {
        return window.requestIdleCallback;
    } else {
        return function (cb) {
            setTimeout(cb, 0);
        }
    }
})();

if (!Function.prototype.bind) {
    Function.prototype.bind = function(oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs   = Array.prototype.slice.call(arguments, 1),
        fToBind = this,
        fNOP    = function() {},
        fBound  = function() {
            return fToBind.apply(this instanceof fNOP
                ? this
                : oThis,
                aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        if (this.prototype) {
            // Function.prototype doesn't have a prototype property
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();
        
        return fBound;
    }
}

/*
function isRootGroup(groupId) {
    return (groupId == null || groupId == '' ||
        groupId == '00000000000000000000000000000000'
    );
}
*/
