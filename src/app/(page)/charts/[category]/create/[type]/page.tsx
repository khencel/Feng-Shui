import CreateChartClient from "./CreateChartClient";

interface PageProps {
    params: Promise<{
        category: string;
        type: string;
    }>;
}

export default async function CreateChart({ params }: PageProps) {

    const { category, type } = await params;

    console.log("Category:", category);
    console.log("Type:", type);

    return (
        <CreateChartClient />
    );
}