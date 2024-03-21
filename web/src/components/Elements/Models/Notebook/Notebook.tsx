import { useEffect, useState } from 'react';
import { Drawer } from '@mui/material';
import { Resizable } from 're-resizable';
import { ResizeCallback } from 're-resizable';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Popover, ArrowContainer } from 'react-tiny-popover';

function NoteBook() {
    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [drawerWidth, setDrawerWidth] = useState(400);

    const toggleDrawer = () => {
        setDrawerOpen(!isDrawerOpen);
    };

    const [userNote, setUserNote] = useState(() => {
        const inLocal = localStorage.getItem('user-note');
        return inLocal || '';
    });

    useEffect(() => {
        localStorage.setItem('user-note', userNote);
    }, [userNote]);

    const handleResize: ResizeCallback = (event, direction, ref, delta) => {
        const newWidth = ref.style.width;
        setDrawerWidth(parseInt(newWidth));
    };

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <div className="flex">
            <Popover
                containerStyle={{
                    zIndex: '99',
                }}
                isOpen={isPopoverOpen}
                positions={['top', 'bottom', 'left', 'right']}
                onClickOutside={() => setIsPopoverOpen(false)}
                content={({ position, childRect, popoverRect }) => (
                    <ArrowContainer
                        position={position}
                        childRect={childRect}
                        popoverRect={popoverRect}
                        arrowColor={'#00ab6b'}
                        arrowSize={3}
                        className="popover-arrow-container"
                        arrowClassName="popover-arrow"
                    >
                        <div
                            style={{
                                fontSize: '12px',
                                backgroundColor: '#00ab6b',
                                color: 'white',
                                paddingLeft: 6,
                                paddingRight: 6,
                                borderRadius: 6,
                            }}
                        >
                            Notebook
                        </div>
                    </ArrowContainer>
                )}
            >
                <button
                    className="px-4 py-1 flex items-center rounded bg-[#2196f3]"
                    onClick={toggleDrawer}
                    onMouseEnter={() => {
                        setIsPopoverOpen(true);
                    }}
                    onMouseLeave={() => setIsPopoverOpen(false)}
                >
                    <EditNoteIcon />
                </button>
            </Popover>

            <Drawer
                open={isDrawerOpen}
                onClose={toggleDrawer}
                anchor="right"
                PaperProps={{
                    style: {
                        width: `${drawerWidth}px`,
                    },
                }}
            >
                <Resizable
                    defaultSize={{
                        width: drawerWidth,
                        height: '100%',
                    }}
                    minWidth={300}
                    maxWidth={800}
                    onResize={handleResize}
                    enable={{ left: true }}
                >
                    <div
                        style={{
                            margin: 'auto',
                            padding: '32px',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            width: '100%',
                        }}
                    >
                        <div
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                marginBottom: '16px',
                            }}
                        >
                            Notebook
                        </div>
                        <textarea
                            style={{
                                borderRadius: '10px',
                                padding: '8px',
                                height: '100%',
                                resize: 'none',
                                border: '1px solid #ccc',
                                outline: 'none',
                            }}
                            onChange={(e) => setUserNote(e.target.value)}
                            placeholder="Write your note..."
                            value={userNote}
                        />
                    </div>
                </Resizable>
            </Drawer>
        </div>
    );
}

export default NoteBook;
