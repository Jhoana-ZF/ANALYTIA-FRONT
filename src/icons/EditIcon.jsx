const EditIcon = (props) => (
    <svg
        width={27}
        height={27}
        viewBox="0 0 27 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        {...props}
    >
        <rect width={27} height={27} fill="url(#pattern3)" />
        <defs>
            <pattern id="pattern3" patternContentUnits="objectBoundingBox" width={1} height={1}>
                <use xlinkHref="#image0_10_71" transform="scale(0.00195312)" />
            </pattern>
            <image
                id="image0_10_71"
                width={512}
                height={512}
                xlinkHref="data:image/png;base64,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"
            />
        </defs>
    </svg>
);
export default EditIcon;
