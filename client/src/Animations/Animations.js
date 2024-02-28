const animations = {
    appear: {
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 }
    },
    fadeInFromBelow: {
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 100 }
    },
    fadeInFromRight: {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: 100 }
    }
};

export default animations;