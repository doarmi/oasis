import { useEffect, useState } from 'react';

export default function OasisCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const [interactive, setInteractive] = useState(false);
    const [clicking, setClicking] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const desktopArea = e.target.closest('.oasis-desktop-intro');

            if (!desktopArea) {
                setVisible(false);
                return;
            }

            setVisible(true);

            setPosition({
                x: e.clientX,
                y: e.clientY,
            });

            const clickable = e.target.closest(
                'a, button, .oasis-desktop-album'
            );

            setInteractive(Boolean(clickable));
        };

        const handleMouseDown = () => {
            setClicking(true);
        };

        const handleMouseUp = () => {
            setClicking(false);
        };

        const handleMouseLeave = () => {
            setVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div
            className={[
                'oasis-custom-cursor',
                visible ? 'visible' : '',
                interactive ? 'interactive' : '',
                clicking ? 'clicking' : '',
            ].join(' ')}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div className="oasis-cursor-vinyl">
                <span className="oasis-cursor-ring ring-1"></span>
                <span className="oasis-cursor-ring ring-2"></span>

                <span className="oasis-cursor-label">
                    <span className="oasis-cursor-play">▶</span>
                </span>
            </div>
        </div>
    );
}