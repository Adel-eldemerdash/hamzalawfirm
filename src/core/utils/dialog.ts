import { Modal } from "bootstrap";


export class confirmDialog {
  dialog: bootstrap.Modal | undefined;

  show(content: string, mustReply: boolean = false) {
    $("body").append(`
          <div class="modal fade" id="dialog_confirm" tabindex="-1" role="dialog" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
                  <div class="modal-content">
                      <div class="modal-header" style="border-width: 0px;border-style: none;justify-content: center;"><img src="./assets/images/Logo.webp" width="63px" /><button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" disabled="" style="display: none;"></button></div>
                      <div class="modal-body" style="padding-top: 0px;">
                      <p id="para_dialog_name" style="margin-bottom: 0px;text-align: center;font-size: 18px;font-family: 'El Messiri', sans-serif;">${content}</p>
                      </div>
                      <div class="modal-footer">
                              <div style="width: 1px;background: rgba(0,0,0,0.4);margin-right: 16px;margin-left: 16px;"></div><button
                              class="secoundButton"
                              id="btn_comfirm_dialog_name"
                              type="button"
                              style="
                                margin-top: 16px;
                              "
                              data-bs-target="#dialog_confirm"
                              data-bs-dismiss="modal"
                            >
                              OK
                            </button>
                          </div>
                      </div>
                  </div>
              </div>
              </div>
              `);
    if (mustReply) {
      $("#dialog_confirm").attr("data-bs-backdrop", "static");
    }
    $("#dialog_confirm").on("hidden.bs.modal", () => {
        this.dialog?.hide();

      $("#dialog_confirm").remove();
      $(".modal-backdrop").remove();
      this.dialog = undefined; // Add this line

    });
    this.dialog = new Modal("#dialog_confirm");
    this.dialog.show();
  }

  onCancel(close: boolean, callback: () => void) {
    $("#btn_cancle_dialog_name").on("click", () => {
      callback();
      if (close) {
        this.dialog?.hide();
      }
    });
  }

  onConfirm(close: boolean, callback: () => void) {
    $("#btn_comfirm_dialog_name").on("click", () => {
      callback();
      if (close) {
        this.dialog?.hide();
      }
    });
  }
}

export class progressDialog {
  dialog: bootstrap.Modal | undefined;

  show() {
    $("body").append(`
          <div class="modal" role="dialog" tabindex="-1" id="dialog_progress" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" style="    background-color: #1f1f63;">
          <div class="modal-dialog modal-dialog-centered modal-dialog-centered modal-dialog-scrollable" role="document">
              <div class="modal-content" style="background: #1f1f63;>
                  <div class="modal-body" style="background: #1f1f63;">
                                      <div class="d-flex flex-column justify-content-center align-items-center" style="padding: 20px;"><img src="./assets/images/Logo.webp" width="63px" style="animation: myAnim 2s ease 0s 1 normal forwards;animation-iteration-count: infinite;" />
                        <p style="margin-bottom: 0px;color: rgb(255,255,255);font-family: 'Bai Jamjuree', sans-serif;font-size: 24px;margin-left: 12px;font-weight: 500;margin-top: 6px;">LOADING....</p>
                    </div>              
                  </div>
              </div>
          </div>
      </div>
              `);
    $("#dialog_progress").on("hidden.bs.modal", () => {
      this.dialog?.hide();

      $("#dialog_progress").remove();
      $(".modal-backdrop").remove();
      this.dialog = undefined;

    });
    this.dialog = new Modal("#dialog_progress");
    this.dialog.show();
  }
}

export let dialog_confirm = new confirmDialog();
export let dialog_progress = new progressDialog();
