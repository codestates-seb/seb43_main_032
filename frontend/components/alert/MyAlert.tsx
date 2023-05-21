import styled from 'styled-components';
import Swal from 'sweetalert2';

export const successAlert = (props: string) => {
  Swal.fire({
    title: 'Success',
    text: props,
    icon: 'success',
    confirmButtonText: '확인',
  });
};

export const warningAlert = (props: string) => {
  Swal.fire({
    title: 'Warning',
    text: props,
    icon: 'warning',
    confirmButtonText: '확인',
    confirmButtonColor: '#FACEA8',
  });
};
