import React from "react"
import { Button, Dialog, DialogActions } from "@mui/material"

interface pageProps {
    data: any
    onClick: () => void
}

const ConfirmNotification: React.FC<pageProps> = ({ data, onClick }) => {
    return (
        <Dialog open={data}>
            {/* <DialogTitle>
                <Typography variant="">Submit your test</Typography>
            </DialogTitle>
            <DialogContent>
                <Typography variant="h3">Are you sure you want submit?</Typography>
                <Typography variant="subtitle2">You can't undo this operation</Typography>
            </DialogContent> */}

            <DialogActions>
                <Button
                    variant="contained"
                    className="text-green-400 hover:text-white"
                >
                    No
                </Button>
                <Button
                    onClick={onClick}
                    variant="contained"
                    className="text-red-500 hover:text-white"
                    color="error"
                >
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmNotification
