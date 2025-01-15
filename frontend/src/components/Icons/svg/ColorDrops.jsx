import React from 'react';

const ColorDrops = ({color='#000000', className='', size='2.25rem'}) => {
    return(
        <svg id="Layer_1" enableBackground="new 0 0 511.451 511.451"
            viewBox="0 0 511.451 511.451" xmlns="http://www.w3.org/2000/svg"
            width={size} height={size}  
            fill={color} className={className}
        >
            <g>
                <path d="m489.02 140.845c-119.142-185.894-66.418-185.788-173.458-8.819-6.4 
                    9.43-25.208 42.91-17.155 75.25 41.902 160.953 264.669 66.19 190.613-66.431z"/>
                <path d="m363.571 323.156c-79.018-20.807-125-110.689-92.294-184.513-109.163-173.981-75.237-171.439-140.009-63.066-76.083 
                    140.275-131.681 203.444-122.883 278.275 25.714 230.396 375.914 197.935 355.186-30.696z" />
            </g>
        </svg>
    );
};


export { ColorDrops };
export default ColorDrops;