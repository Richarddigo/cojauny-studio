export default function StudioWordmark() {
    return (
        <span className="studio-wordmark">
            <svg
                viewBox="0 0 34 34"
                width="34"
                height="34"
                fill="none"
                aria-hidden="true"
            >
                <path
                    d="M2 27 12 8l7 12 5-8 8 15H2Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinejoin="round"
                />
                <path
                    d="m9 14 3 4 3-4M22 16l2 3 2-3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
            </svg>
            <span>
                Cojauny <span className="wordmark-studio">Studio</span>
            </span>
        </span>
    );
}
