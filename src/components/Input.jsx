const Input = ({ label, icon, type, ...props }) => {
    return (
        <>
            <label>{label}:</label>
            <div className="relative mt-0.5 mb-2">
                <input
                    placeholder={label}
                    {...props}
                    className={`border-2 border-[#161515] border-opacity-40 rounded-[9.5px] w-full h-[53px] ${icon ? "pl-11 pr-5" : "px-3"}`}
                />
            </div>
        </>
    );
};

export default Input;
