import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Card, Col, Input, Row, Button } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import {
  deleteIssue,
  fetchIssuesAsync,
  moveIssue,
  setIssues,
} from '../../store';
import { RootState } from '../../store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

import styles from './KanbanBoard.module.css';

const { Meta } = Card;

const KanbanBoard: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, null, AnyAction> = useDispatch();

  const [repoUrl, setRepoUrl] = useState('');
  const issues = useSelector((state: RootState) => state.kanban.issues);

  useEffect(() => {
    const storedIssues = localStorage.getItem('issues');
    if (storedIssues) {
      dispatch(setIssues(JSON.parse(storedIssues)));
    }
  }, [dispatch]);

  useEffect(() => {
    if (issues.length > 0) {
      localStorage.setItem('issues', JSON.stringify(issues));
    }
  }, [issues]);

  const handleFetchIssues = () => {
    dispatch(fetchIssuesAsync(getRepoName()));
  };

  const handleMoveIssue = (issueId: number, newState: string) => {
    dispatch(moveIssue({ issueId, newState }));
  };
  const handleRepoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepoUrl(e.target.value);
  };
  const handleClearIssue = (issueId: number) => {
    dispatch(deleteIssue(issueId)); // Припустимо, що ви маєте дію deleteIssue для видалення завдання зі списку
  };
  const getRepoName = () => {
    const urlParts = repoUrl.split('/');
    return `${urlParts[urlParts.length - 2]}/${urlParts[urlParts.length - 1]}`;
  };

  return (
    <div className={styles.kanban_board}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Input
            placeholder="Enter repo URL example https://github.com/facebook/react "
            addonAfter={<GithubOutlined />}
            value={repoUrl}
            onChange={handleRepoUrlChange}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Button
            className={styles.kanban_button}
            type="primary"
            onClick={handleFetchIssues}
          >
            Load
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <h2>To Do</h2>
          {issues
            .filter((issue) => issue.state === 'open')
            .map((issue) => (
              <Card key={issue.id} className={styles.kanban_card}>
                <Meta title={issue.title} description={`#${issue.id}`} />
                <Button
                  onClick={() => handleMoveIssue(issue.id, 'in_progress')}
                  className={styles.kanban_button}
                >
                  Start
                </Button>
              </Card>
            ))}
        </Col>
        <Col span={8}>
          <h2>In Progress</h2>
          {issues
            .filter((issue) => issue.state === 'in_progress')
            .map((issue) => (
              <Card key={issue.id} className={styles.kanban_card}>
                <Meta title={issue.title} description={`#${issue.id}`} />
                <Button
                  onClick={() => handleMoveIssue(issue.id, 'closed')}
                  className={styles.kanban_button}
                >
                  Finish
                </Button>
              </Card>
            ))}
        </Col>
        <Col span={8}>
          <h2>Done</h2>
          {issues
            .filter((issue) => issue.state === 'closed')
            .map((issue) => (
              <Card key={issue.id} className={styles.kanban_card}>
                <Meta title={issue.title} description={`#${issue.id}`} />
                <Button
                  onClick={() => handleClearIssue(issue.id)} // Додайте onClick обробник для виклику handleClearIssue
                  className={styles.kanban_button}
                >
                  Done
                </Button>
              </Card>
            ))}
        </Col>
      </Row>
    </div>
  );
};

export default KanbanBoard;
