import React, { FC, ComponentProps } from "react";

export interface ParagraphProps extends ComponentProps<"p"> {}

const Paragraph: FC<ParagraphProps> = (props) => {
    return <p {...props} />;
};

export default Paragraph;
