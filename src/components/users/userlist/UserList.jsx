import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectStatus,
  selectMessage,
  selectTotalSize,
  selectUserList,
  selectCurrentPage,
  fetchUserAsync,
  setCurrentUser,
  resetMessage,
  resetUserList,
  setCurrentPage,
} from "../reducer/usersSlice";
import CustomToast from "../../common/toast/CustomToast";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Loader from "../../common/loader/Loader";
import { GRID_COLUMNS, PAGE_LIMIT } from "../../../constants";
import { useNavigate } from "react-router-dom";
import DataGrid from "../../common/grid/DataGrid";
import UserCard from "./usercard/UserCard";
import styles from "./UserList.module.css";
import Pager from "../../common/pager/Pager";

export function UserList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPage = useSelector(selectCurrentPage);
  const message = useSelector(selectMessage);
  const status = useSelector(selectStatus);
  const totalSize = useSelector(selectTotalSize);
  const userList = useSelector(selectUserList);
  const [showAllUsers, setshowAllUsers] = useState(false);
  const [showToast, setShowToast] = useState(false);
  
  React.useEffect(() => {
    dispatch(
      fetchUserAsync({
        searchTerm: " ",
        searchAll: showAllUsers,
        currentPage: 1,
      })
    );
  }, []);
  const handleTableChange = (type, { page, sizePerPage }) => {
    dispatch(resetUserList());
    dispatch(
      fetchUserAsync({
        searchTerm: " ",
        searchAll: showAllUsers,
        currentPage: page,
      })
    );
  };

  const handleRowClick = (e, row, rowIndex) => {
    dispatch(setCurrentUser(row));
    navigate(`/edit/${row.id}`, { replace: true });
  };
  const handleToastClose = (e) => {
    setShowToast(false);

    dispatch(resetMessage());
  };
  const onCardClick = (user) => (e) => {
    dispatch(setCurrentUser(user));
    navigate(`/edit/${user.id}`, { replace: true });
  };
  useEffect(() => {
    setShowToast(message ? true : false);
  }, [message]);

  return (
    <Container className={styles.userListWrapper} fluid>
      <Row>
        <Col xs={6} sm={4} lg={2}>
          <div className={styles.chkWrapper}>
            <Form.Check
              type="checkbox"
              id="custom-switch"
              label="Show All Users"
              checked={showAllUsers}
              onChange={(e) => {
                setshowAllUsers(e.target.checked);
                dispatch(resetUserList());
                dispatch(
                  fetchUserAsync({
                    searchTerm: " ",
                    searchAll: e.target.checked,
                    currentPage,
                  })
                );
              }}
            />
          </div>
        </Col>

        <Col className="text-end" xs={6} lg={10} sm={8}>
          <div className={styles.buttonWrapper}>
            <Button
              onClick={() => {
                dispatch(
                  setCurrentUser({
                    id: 0,
                    first_name: "",
                    last_name: "",
                    email: "",
                    gender: "Male",
                    status: true,
                  })
                );
                navigate("/new", { replace: true });
              }}
              variant="primary"
            >
              Add New
            </Button>{" "}
          </div>
        </Col>
      </Row>
      <Row>
        <Col className="d-none d-lg-block" lg={12}>
          <div className={styles.gridContainer}>
            <DataGrid
              data={userList}
              columns={GRID_COLUMNS}
              onTableChange={handleTableChange}
              page={currentPage}
              sizePerPage={50}
              totalSize={totalSize}
              onRowClick={handleRowClick}
            />
          </div>
        </Col>
        <Col className="d-md-block d-sm-block d-xs-block d-lg-none" xs={12}>
          {status === "loading" && (
            <div className={styles.loaderWrapper}>
              <Loader />{" "}
            </div>
          )}
          {status === "idle" && userList.length > 0 && (
            <div className={styles.cardOutterWrapper}>
              <div className={styles.cardWrapper}>
                <div className={styles.pagerWrapper}>
                  <Pager
                    totalSize={totalSize}
                    pageLimit={PAGE_LIMIT}
                    currentPage={currentPage}
                    onPageClick={(currentPage) => {
                      setCurrentPage(currentPage);
                      dispatch(resetUserList());
                      dispatch(
                        fetchUserAsync({
                          searchTerm: " ",
                          searchAll: showAllUsers,
                          currentPage: currentPage,
                        })
                      );
                    }}
                  />
                </div>
                {userList.map((user) => {
                  return (
                    <UserCard user={user} onClick={onCardClick} key={user.id} />
                  );
                })}
              </div>
              <div>
                <div className={styles.pagerWrapper}>
                  <Pager
                    totalSize={totalSize}
                    pageLimit={PAGE_LIMIT}
                    currentPage={currentPage}
                    onPageClick={(currentPage) => {
                      setCurrentPage(currentPage);
                      dispatch(resetUserList());
                      dispatch(
                        fetchUserAsync({
                          searchTerm: " ",
                          searchAll: showAllUsers,
                          currentPage: currentPage,
                        })
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </Col>
        <CustomToast
          variant={status === "error" ? "Danger" : "Primary"}
          show={showToast}
          message={message}
          onClose={handleToastClose}
        />
      </Row>
    </Container>
  );
}
