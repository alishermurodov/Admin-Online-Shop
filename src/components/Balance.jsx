import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";


function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits() {
    return (
        <div className="py-[20px] px-[20px] bg-[#fff] rounded-[10px]">
            <React.Fragment>
                <h1 className="mb-[20px] text-[#5297f0] text-[32px]">Recent Deposits</h1>
                <Typography component="p" variant="h4">
                    $98,318,024.00
                </Typography>
                <Typography color="text.secondary" sx={{ flex: 1 }}>
                    on 15 March, 2019
                </Typography>
                <div className="mt-[100px]">
                    <Link color="primary" href="#" onClick={preventDefault}>
                        View balance
                    </Link>
                </div>
            </React.Fragment>
        </div>

    );
}
