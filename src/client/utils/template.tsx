import * as React from 'react';
import { useEffect, useState } from 'react';

const Template = (props: TemplateProps) => {    

    const [placeholder, setPlaceholder] = useState(null);

    useEffect(() => {}, []);

    return (
            <>
            <h1 className="text-center">Template</h1>
            </>
    );
}

interface TemplateProps {}

export default Template;