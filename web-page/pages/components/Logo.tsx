import React from 'react';

const Logo = ({ isScrolled }: { isScrolled: boolean }) => {
    return (
        <div className="flex items-center gap-3">
            <img
                src="/logo-completo.svg"
                alt="Origen Sierra Nevada"
                className={`transition-all duration-500 ${isScrolled ? 'h-12' : 'h-16'} w-auto drop-shadow-md`}
            />
        </div>
    );
};

export default Logo;
