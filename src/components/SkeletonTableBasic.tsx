import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

export default function SkeletonTableBasic() {
    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Skeleton className="h-3 w-40" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-3 w-40" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-3 w-40" />
                        </TableHead>
                        <TableHead>
                            <Skeleton className="h-3 w-40" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(3)].map((_, i) => (
                        <TableRow key={i}>
                            <TableCell>
                                <Skeleton className="h-5 w-40" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-5 w-40" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-5 w-40" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-5 w-40" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}