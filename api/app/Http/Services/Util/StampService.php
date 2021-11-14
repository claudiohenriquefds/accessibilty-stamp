<?php

namespace App\Http\Services\Util;

class StampService
{
    public static function getStamp($params){

        if($params['site']->average <= 0 && $params['site']->average < 2){
            $status = 'INACESSIVEL';
            $level = 1;
        }elseif($params['site']->average >= 2 && $params['site']->average < 4){
            $status = 'POUCO ACESSIVEL';
            $level = 2;
        }elseif($params['site']->average >= 4 && $params['site']->average < 6){
            $status = 'ACESSIVEL';
            $level = 3;
        }elseif($params['site']->average >= 6 && $params['site']->average < 8){
            $status = 'MODERADO';
            $level = 4;
        }elseif($params['site']->average >= 8 && $params['site']->average <= 10){
            $status = 'EXCELENTE';
            $level = 5;
        }else{
            $status = 'INACESSIVEL';
            $level = 6;
        }


        return '<style>
        .box-accessibility-stamp {
          max-width: 350px;
          min-width: 300px;
          max-height: 150px;
          background: #f2f2f2;
          border: 1px solid #6c6c6c;
          color: #6c6c6c;
          box-sizing: border-box;
          border-radius: 10px;
          font-family: Roboto;
          font-style: normal;
        }

        .content-accessibility-stamp {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .image-accessibility-stamp svg {
          max-width: 60px;
        }
        .info-up-accessibility-stamp {
          display: flex;
          justify-content: space-between;
        }

        .info-center-accessibility-stamp span {
          font-weight: 500;
        }
        .info-bottom-accessibility-stamp {
          font-weight: 300;
        }
        .info-up-accessibility-stamp span {
          font-weight: 300;
          font-size: 10px;
          line-height: 14px;
        }

        .content-text-accessibility-stamp {
          display: block;
          align-items: center;
        }

        .indicators-accessibility-stamp {
          display: block;
        }

        .indicators-accessibility-stamp span {
          display: block;
          font-size: 10px;
        }
        .href-accessibility-stamp{
            text-decoration: none;
        }
      </style>
      <a href="'.config('app.endpoint_info').$params['site']->id.'" class="href-accessibility-stamp">
          <div class="box-accessibility-stamp">
            <div class="content-accessibility-stamp">
              <div class="image-accessibility-stamp">
                <svg
                  width="102"
                  height="70"
                  viewBox="0 0 102 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 43L1 35L9 27"
                    stroke="#6C6C6C"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M93 43L101 35L93 27"
                    stroke="#6C6C6C"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M48.0926 0.309407C47.6689 0.398625 46.8324 0.71089 46.2525 0.989697C44.2563 1.94879 42.6726 3.9339 42.1708 6.09744C41.2786 10.0007 43.4756 13.9263 47.312 15.2535C48.115 15.5434 48.3491 15.5657 49.7097 15.5657C51.0703 15.5657 51.3045 15.5434 52.1075 15.2535C54.6725 14.3724 56.6464 12.2089 57.2375 9.66617C57.3379 9.23123 57.4271 8.42826 57.4271 7.8818C57.4271 5.72941 56.7022 4.00081 55.1743 2.4618C54.3714 1.64768 54.048 1.41348 53.1669 0.989697C51.4606 0.164428 49.8212 -0.0474653 48.0926 0.309407Z"
                    fill="#6C6C6C"
                  />
                  <path
                    d="M70.899 14.562C70.6202 14.6401 69.3154 15.0416 67.9994 15.4431C57.204 18.7441 51.0814 19.9709 47.6019 19.5471C44.0443 19.101 37.9887 17.6401 30.7397 15.4542C29.1895 14.9858 27.6617 14.5843 27.3494 14.5509C25.71 14.3836 23.9145 15.3762 23.2454 16.8371C23.0446 17.2609 23 17.5732 23 18.4207C23 19.3352 23.0446 19.5694 23.29 20.1047C23.6803 20.93 24.2602 21.5657 24.9851 21.9225C25.2974 22.0898 29.5018 23.4058 34.3196 24.8444C39.1373 26.2942 43.2302 27.5767 43.4198 27.6994C43.6094 27.8332 43.8882 28.1121 44.0332 28.3239C44.3455 28.7812 44.3455 29.1604 44.0778 33.4763C43.8548 37.0227 43.6206 39.0859 43.286 40.6138C42.5276 43.9817 39.182 52.9482 35.3679 61.8031L34.0408 64.87V65.9852C34.0408 66.9777 34.0742 67.1673 34.353 67.7361C34.7545 68.5614 35.4794 69.2863 36.3047 69.6877C36.8623 69.9665 37.063 70 37.9998 70C38.9254 70 39.1373 69.9665 39.6727 69.6989C40.0072 69.5316 40.4756 69.2082 40.6987 68.974C41.1336 68.5279 41.1782 68.4387 46.5871 57.4314C48.2599 54.0188 49.6651 51.2419 49.6985 51.2642C49.7432 51.2865 51.5275 55.1006 53.6688 59.7511C58.007 69.1301 57.9066 68.9628 59.2784 69.632C59.9475 69.9665 60.1148 70 61.0293 70C61.9437 70 62.111 69.9665 62.7802 69.632C64.2188 68.9294 65.0218 67.6469 65.0329 66.0409C65.0329 65.3272 64.9772 65.0595 64.6426 64.2566C64.4195 63.7324 63.4158 61.3235 62.401 58.9035C58.8434 50.4055 56.468 43.9371 55.7319 40.7587C55.3081 38.9744 54.9401 35.0934 54.7728 30.9001C54.7059 29.1715 54.7171 28.915 54.8955 28.5693C55.1074 28.1344 55.4754 27.7106 55.7431 27.5656C55.8434 27.5098 59.8583 26.2831 64.6649 24.8333C69.4715 23.3835 73.6202 22.101 73.8767 21.9783C74.5347 21.6549 75.4045 20.6735 75.6945 19.9151C76.0625 18.9114 76.096 18.1308 75.806 17.1828C75.5941 16.4802 75.4715 16.2795 74.8804 15.6884C74.3674 15.1866 74.0105 14.9301 73.5198 14.7405C72.7057 14.4394 71.5793 14.3501 70.899 14.562Z"
                    fill="#6C6C6C"
                  />
                </svg>
              </div>
              <div class="indicators-accessibility-stamp">
                <span>Warning '.$params['details']['warning'].'</span>
                <span>Passed '.$params['details']['passed'].'</span>
                <span>Failed '.$params['details']['failed'].'</span>
              </div>
              <div class="content-text-accessibility-stamp">
                <div class="info-up-accessibility-stamp">
                  <span>Nivel '.$level.'</span>
                  <span>Score '.$params['site']->average.'</span>
                </div>
                <div class="info-center-accessibility-stamp">
                  <span>'.$status.'</span>
                </div>
                <div class="info-bottom-accessibility-stamp">Selo de acessibilidade</div>
              </div>
            </div>
          </div>
      </a>';
    }

    public static function notFound(){
        return '<style>
        .box-accessibility-stamp {
          max-width: 350px;
          min-width: 300px;
          max-height: 150px;
          background: #f2f2f2;
          border: 1px solid #6c6c6c;
          color: #6c6c6c;
          box-sizing: border-box;
          border-radius: 10px;
          font-family: Roboto;
          font-style: normal;
        }

        .content-accessibility-stamp {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }

        .image-accessibility-stamp svg {
          max-width: 60px;
        }
        .info-up-accessibility-stamp {
          display: flex;
          justify-content: space-between;
        }

        .info-center-accessibility-stamp span {
          font-weight: 500;
        }
        .info-bottom-accessibility-stamp {
          font-weight: 300;
        }
        .info-up-accessibility-stamp span {
          font-weight: 300;
          font-size: 10px;
          line-height: 14px;
        }

        .content-text-accessibility-stamp {
          display: block;
          align-items: center;
        }

        .indicators-accessibility-stamp {
          display: block;
        }

        .indicators-accessibility-stamp span {
          display: block;
          font-size: 10px;
        }
        .href-accessibility-stamp{
            text-decoration: none;
        }
      </style>
          <div class="box-accessibility-stamp">
            <div class="content-accessibility-stamp">
              <div class="image-accessibility-stamp">
                <svg
                  width="102"
                  height="70"
                  viewBox="0 0 102 70"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 43L1 35L9 27"
                    stroke="#6C6C6C"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M93 43L101 35L93 27"
                    stroke="#6C6C6C"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M48.0926 0.309407C47.6689 0.398625 46.8324 0.71089 46.2525 0.989697C44.2563 1.94879 42.6726 3.9339 42.1708 6.09744C41.2786 10.0007 43.4756 13.9263 47.312 15.2535C48.115 15.5434 48.3491 15.5657 49.7097 15.5657C51.0703 15.5657 51.3045 15.5434 52.1075 15.2535C54.6725 14.3724 56.6464 12.2089 57.2375 9.66617C57.3379 9.23123 57.4271 8.42826 57.4271 7.8818C57.4271 5.72941 56.7022 4.00081 55.1743 2.4618C54.3714 1.64768 54.048 1.41348 53.1669 0.989697C51.4606 0.164428 49.8212 -0.0474653 48.0926 0.309407Z"
                    fill="#6C6C6C"
                  />
                  <path
                    d="M70.899 14.562C70.6202 14.6401 69.3154 15.0416 67.9994 15.4431C57.204 18.7441 51.0814 19.9709 47.6019 19.5471C44.0443 19.101 37.9887 17.6401 30.7397 15.4542C29.1895 14.9858 27.6617 14.5843 27.3494 14.5509C25.71 14.3836 23.9145 15.3762 23.2454 16.8371C23.0446 17.2609 23 17.5732 23 18.4207C23 19.3352 23.0446 19.5694 23.29 20.1047C23.6803 20.93 24.2602 21.5657 24.9851 21.9225C25.2974 22.0898 29.5018 23.4058 34.3196 24.8444C39.1373 26.2942 43.2302 27.5767 43.4198 27.6994C43.6094 27.8332 43.8882 28.1121 44.0332 28.3239C44.3455 28.7812 44.3455 29.1604 44.0778 33.4763C43.8548 37.0227 43.6206 39.0859 43.286 40.6138C42.5276 43.9817 39.182 52.9482 35.3679 61.8031L34.0408 64.87V65.9852C34.0408 66.9777 34.0742 67.1673 34.353 67.7361C34.7545 68.5614 35.4794 69.2863 36.3047 69.6877C36.8623 69.9665 37.063 70 37.9998 70C38.9254 70 39.1373 69.9665 39.6727 69.6989C40.0072 69.5316 40.4756 69.2082 40.6987 68.974C41.1336 68.5279 41.1782 68.4387 46.5871 57.4314C48.2599 54.0188 49.6651 51.2419 49.6985 51.2642C49.7432 51.2865 51.5275 55.1006 53.6688 59.7511C58.007 69.1301 57.9066 68.9628 59.2784 69.632C59.9475 69.9665 60.1148 70 61.0293 70C61.9437 70 62.111 69.9665 62.7802 69.632C64.2188 68.9294 65.0218 67.6469 65.0329 66.0409C65.0329 65.3272 64.9772 65.0595 64.6426 64.2566C64.4195 63.7324 63.4158 61.3235 62.401 58.9035C58.8434 50.4055 56.468 43.9371 55.7319 40.7587C55.3081 38.9744 54.9401 35.0934 54.7728 30.9001C54.7059 29.1715 54.7171 28.915 54.8955 28.5693C55.1074 28.1344 55.4754 27.7106 55.7431 27.5656C55.8434 27.5098 59.8583 26.2831 64.6649 24.8333C69.4715 23.3835 73.6202 22.101 73.8767 21.9783C74.5347 21.6549 75.4045 20.6735 75.6945 19.9151C76.0625 18.9114 76.096 18.1308 75.806 17.1828C75.5941 16.4802 75.4715 16.2795 74.8804 15.6884C74.3674 15.1866 74.0105 14.9301 73.5198 14.7405C72.7057 14.4394 71.5793 14.3501 70.899 14.562Z"
                    fill="#6C6C6C"
                  />
                </svg>
              </div>
              <div class="indicators-accessibility-stamp">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div class="content-text-accessibility-stamp">
                <div class="info-up-accessibility-stamp">
                  <span></span>
                  <span></span>
                </div>
                <div class="info-center-accessibility-stamp">
                  <span>Site não identificado</span>
                </div>
                <div class="info-bottom-accessibility-stamp">Selo de acessibilidade</div>
              </div>
            </div>
          </div>';
    }
}
