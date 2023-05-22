import Swal from 'sweetalert2';

export const successAlert = (text: string, title: string) => {
  Swal.fire({
    title: title,
    text: text,
    icon: 'success',
    confirmButtonText: '확인',
    confirmButtonColor: 'rgb(165,220,134)',
  });
};

export const errorAlert = (text: string, title: string) => {
  Swal.fire({
    title: title,
    text: text,
    icon: 'error',
    confirmButtonText: '확인',
    confirmButtonColor: '#F27474',
  });
};
export const confirmAlert = (text: string, title: string) => {
  return new Promise<void>((resolve, reject) => {
    Swal.fire({
      title: `정말 ${text} 하시겠습니까?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'rgb(165,220,134)',
      cancelButtonColor: '#F27474',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: title,
          text: `${text}이 완료되었습니다.`,
          icon: 'success',
          confirmButtonText: '확인',
          confirmButtonColor: 'rgb(165,220,134)',
        }).then(() => {
          resolve(); // 확인 버튼을 눌렀을 때 Promise를 resolve하여 완료됨을 알림
        });
      } else {
        Swal.fire({
          title: title,
          text: `${text}이 취소되었습니다.`,
          icon: 'error',
          confirmButtonText: '확인',
          confirmButtonColor: '#F27474',
        }).then(() => {
          reject(); // 취소 버튼을 눌렀을 때 Promise를 reject하여 취소됨을 알림
        });
      }
    });
  });
};
