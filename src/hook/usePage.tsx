/* eslint-disable @typescript-eslint/no-explicit-any */
import {useDispatch, useSelector} from "react-redux";
import {
  setCloseModal,
  setIsEditing,
  setIsLoading,
  setTotal,
} from "../redux/slice/dataSlice";
import {RootState} from "../redux/store";
import {baseService} from "../service/baseService";
import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

type Props = {
  endpoint: string;
  form: any;
  itemSelected: any;
  setItems: any;
};

export const usePage = ({endpoint, form, itemSelected, setItems}: Props) => {
  const dispatch = useDispatch();

  const {isEditing} = useSelector((state: RootState) => state.data);

  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState(searchParams.get("page") || 1);
  const [currentLimit, setCurrentLimit] = useState(
    searchParams.get("limit") || 10
  );

  useEffect(() => {
    setSearchParams({
      page: currentPage.toString(),
      limit: currentLimit.toString(),
    });
    handleGetData(+currentPage, +currentLimit);
  }, [currentPage, currentLimit]);

  const handleSubmitForm = async (data: any) => {
    try {
      dispatch(setIsLoading(true));
      let response = null;
      if (!isEditing) {
        response = await baseService.create(endpoint, data);
      } else {
        response = await baseService.update(
          endpoint,
          itemSelected?._id as string,
          data
        );
      }
      if (response?.success) {
        dispatch(setCloseModal());
        form.resetFields();
        if (isEditing) {
          handleGetData(+currentPage, +currentLimit);
        } else {
          if (+currentPage > 1) {
            setCurrentPage(1);
          } else {
            handleGetData(+currentPage, +currentLimit);
          }
        }
        dispatch(setIsEditing(false));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleGetData = async (
    page: number = +currentPage,
    limit: number = +currentLimit
  ) => {
    try {
      dispatch(setIsLoading(true));
      const response = await baseService.findAll(endpoint, page, limit);
      if (response) {
        setItems(response.data);
        dispatch(setTotal(response.total));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  return {
    handleSubmitForm,
    handleGetData,
    currentPage,
    currentLimit,
    setCurrentPage,
    setCurrentLimit,
  };
};
