import React from 'react';

import { Card } from 'antd';
import { IssueCardProps } from '../../interfaces';

const { Meta } = Card;

const IssueCard: React.FC<IssueCardProps> = ({ issue }) => {
  return (
    <Card>
      <Meta title={issue.title} description={`#${issue.number}`} />
    </Card>
  );
};

export default IssueCard;
