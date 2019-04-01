<template>
  <div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="errorModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="errorModalLabel">Có lỗi xảy ra</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="text-muted modal-body">
          Vui lòng thử refresh (F5) trang web. Nếu lỗi vẫn xảy ra, hãy liên hệ với Jojo Group admin.
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="refresh">Tải lại</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class ErrorModal extends Vue {
  refresh() {
    window.location.reload(false);
  }
}
</script>

<style scoped lang="scss">
  #errorModal {
    top: 120px;

    .modal-header {
      background-color: #e54f4f;
    }
  }
</style>