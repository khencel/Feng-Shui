
interface LoadingProps {
    loading: boolean;
}

export default function LoadingFullScreen({ loading }: LoadingProps) {
    if (!loading) return null;

    return (
        <div
            className="position-fixed top-0 start-0 w-100 vh-100 d-flex justify-content-center align-items-center"
            style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                zIndex: 9999,
            }}
        >
            <div
                className="spinner-border text-primary"
                role="status"
                aria-label="Loading"
            >
                <span className="visually-hidden">
                    Loading...
                </span>
            </div>
        </div>
    );
}
