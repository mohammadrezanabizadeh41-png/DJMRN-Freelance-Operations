// X32 DJMRN original D3D11 frame-capture fixture (no third-party code/content).
// Build w64devkit g++ -std=c++17 -O2 -I <RenderDoc header> ... -ld3d11 -ldxgi -ld3dcompiler -luser32 -lgdi32
// The only process launched under RenderDoc is THIS owner-authored exe.
#define WIN32_LEAN_AND_MEAN
#include <windows.h>
#include <d3d11.h>
#include <d3dcompiler.h>
#include <renderdoc_app.h>
#include <vector>
#include <cstdio>
#include <cstring>
#include <cstdlib>
#include <cmath>
#include <string>
#pragma comment(lib,"d3d11.lib")
struct Vertex {float x,y,z,r,g,b,a;};
static LRESULT CALLBACK WndProc(HWND h,UINT m,WPARAM w,LPARAM l){if(m==WM_DESTROY){PostQuitMessage(0);return 0;}return DefWindowProc(h,m,w,l);}
template<class T> void clearObj(T*& p){if(p){p->Release();p=nullptr;}}
int main(int argc,char** argv){
 const char* captureTemplate = argc>1?argv[1]:"X32-OWN-D3D11";
 SetErrorMode(SEM_FAILCRITICALERRORS|SEM_NOGPFAULTERRORBOX);
 WNDCLASSA wc{};wc.lpfnWndProc=WndProc;wc.hInstance=GetModuleHandle(nullptr);wc.lpszClassName="DJMRN_X32_OWN_D3D11";wc.hCursor=LoadCursor(nullptr,IDC_ARROW);
 if(!RegisterClassA(&wc)){printf("X32_FAIL WINDOW_CLASS %lu\n",GetLastError());return 2;}
 HWND hw=CreateWindowA(wc.lpszClassName,"DJMRN OWN X32 GPU Capture Test",WS_OVERLAPPEDWINDOW,
         CW_USEDEFAULT,CW_USEDEFAULT,800,550,nullptr,nullptr,wc.hInstance,nullptr);
 if(!hw){puts("X32_FAIL CREATE_WINDOW");return 3;}
 ShowWindow(hw,SW_SHOW);UpdateWindow(hw);
 DXGI_SWAP_CHAIN_DESC sd{};sd.BufferCount=2;sd.BufferDesc.Width=768;sd.BufferDesc.Height=480;
 sd.BufferDesc.Format=DXGI_FORMAT_R8G8B8A8_UNORM;sd.BufferUsage=DXGI_USAGE_RENDER_TARGET_OUTPUT;
 sd.OutputWindow=hw;sd.SampleDesc.Count=1;sd.Windowed=TRUE;sd.SwapEffect=DXGI_SWAP_EFFECT_DISCARD;
 ID3D11Device* dev=nullptr;ID3D11DeviceContext* ctx=nullptr;IDXGISwapChain* sc=nullptr;D3D_FEATURE_LEVEL fl{};
 HRESULT hr=D3D11CreateDeviceAndSwapChain(nullptr,D3D_DRIVER_TYPE_HARDWARE,nullptr,D3D11_CREATE_DEVICE_BGRA_SUPPORT,
            nullptr,0,D3D11_SDK_VERSION,&sd,&sc,&dev,&fl,&ctx);
 if(FAILED(hr)){printf("X32_FAIL HARDWARE_D3D11 hr=%08lx\n",(unsigned long)hr);return 4;}
 printf("X32_DEVICE D3D11_HARDWARE feature=%x\n",(unsigned)fl);fflush(stdout);
 ID3D11Texture2D* back=nullptr;ID3D11RenderTargetView* rtv=nullptr;
 hr=sc->GetBuffer(0,__uuidof(ID3D11Texture2D),(void**)&back);
 if(FAILED(hr)){printf("X32_FAIL BACKBUFFER %08lx\n",(unsigned long)hr);return 5;}
 hr=dev->CreateRenderTargetView(back,nullptr,&rtv);clearObj(back);
 if(FAILED(hr)){printf("X32_FAIL RTV %08lx\n",(unsigned long)hr);return 6;}
 const char* hlsl=
 "struct VI {float3 pos:POSITION;float4 col:COLOR0;};\n"
 "struct VO {float4 pos:SV_Position;float4 col:COLOR0;};\n"
 "VO VS(VI a,uint iid:SV_InstanceID){VO o;o.pos=float4(a.pos.xy+float2(iid*.17,0),a.pos.z,1);o.col=a.col;return o;}\n"
 "float4 PS(VO a):SV_Target{return a.col;}\n";
 ID3DBlob* vsb=nullptr;ID3DBlob* psb=nullptr;ID3DBlob* errs=nullptr;
 hr=D3DCompile(hlsl,strlen(hlsl),nullptr,nullptr,nullptr,"VS","vs_5_0",0,0,&vsb,&errs);
 if(FAILED(hr)){printf("X32_FAIL VS_COMPILE %s\n",errs?(char*)errs->GetBufferPointer():"no-msg");return 7;}
 clearObj(errs);
 hr=D3DCompile(hlsl,strlen(hlsl),nullptr,nullptr,nullptr,"PS","ps_5_0",0,0,&psb,&errs);
 if(FAILED(hr)){printf("X32_FAIL PS_COMPILE %s\n",errs?(char*)errs->GetBufferPointer():"no-msg");return 8;}
 clearObj(errs);
 ID3D11VertexShader* vs=nullptr;ID3D11PixelShader* ps=nullptr;ID3D11InputLayout* layout=nullptr;
 hr=dev->CreateVertexShader(vsb->GetBufferPointer(),vsb->GetBufferSize(),nullptr,&vs);
 if(FAILED(hr))return 9;
 hr=dev->CreatePixelShader(psb->GetBufferPointer(),psb->GetBufferSize(),nullptr,&ps);
 if(FAILED(hr))return 10;
 D3D11_INPUT_ELEMENT_DESC el[]={
  {"POSITION",0,DXGI_FORMAT_R32G32B32_FLOAT,0,0,D3D11_INPUT_PER_VERTEX_DATA,0},
  {"COLOR",0,DXGI_FORMAT_R32G32B32A32_FLOAT,0,12,D3D11_INPUT_PER_VERTEX_DATA,0}};
 hr=dev->CreateInputLayout(el,2,vsb->GetBufferPointer(),vsb->GetBufferSize(),&layout);
 clearObj(vsb);clearObj(psb);
 if(FAILED(hr)){printf("X32_FAIL LAYOUT %08lx\n",(unsigned long)hr);return 11;}
 std::vector<Vertex> grid;std::vector<unsigned short> idx;
 for(int y=0;y<16;y++)for(int x=0;x<32;x++){
  grid.push_back({-.94f+.67f*x/31.f,-.76f+1.52f*y/15.f,0.0f,.1f,.85f,.62f,1.0f});
 }
 for(int y=0;y<15;y++)for(int x=0;x<31;x++){
  int a=y*32+x,b=a+32;idx.push_back(a);idx.push_back(a+1);idx.push_back(b+1);
  idx.push_back(a);idx.push_back(b+1);idx.push_back(b);
 }
 Vertex points[5]={{-.14f,-.45f,0,1,0,1,1},{0,.2f,0,1,0,1,1},
 {.14f,-.2f,0,1,0,1,1},{.12f,.4f,0,1,0,1,1},{.27f,-.3f,0,1,0,1,1}};
 Vertex tri[3]={{.30f,-.4f,0,.2f,.6f,1,1},{.40f,-.4f,0,.2f,.6f,1,1},{.35f,-.1f,0,.2f,.6f,1,1}};
 auto mkbuf=[&](const void* data,UINT bytes,UINT bind)->ID3D11Buffer*{
  D3D11_BUFFER_DESC desc{};desc.ByteWidth=bytes;desc.Usage=D3D11_USAGE_DEFAULT;desc.BindFlags=bind;
  D3D11_SUBRESOURCE_DATA init{};init.pSysMem=data;ID3D11Buffer* out=nullptr;
  HRESULT ret=dev->CreateBuffer(&desc,&init,&out);if(FAILED(ret))printf("X32_BUFFER_FAIL %08lx\n",(unsigned long)ret);
  return out;
 };
 ID3D11Buffer* gv=mkbuf(grid.data(),(UINT)(grid.size()*sizeof(Vertex)),D3D11_BIND_VERTEX_BUFFER);
 ID3D11Buffer* gi=mkbuf(idx.data(),(UINT)(idx.size()*sizeof(unsigned short)),D3D11_BIND_INDEX_BUFFER);
 ID3D11Buffer* pv=mkbuf(points,(UINT)sizeof(points),D3D11_BIND_VERTEX_BUFFER);
 ID3D11Buffer* tv=mkbuf(tri,(UINT)sizeof(tri),D3D11_BIND_VERTEX_BUFFER);
 if(!gv||!gi||!pv||!tv)return 12;
 printf("X32_OWNER_GROUNDTRUTH gridVertices=%zu indices=%zu triangles=%zu points=5 instanceCopies=3\n",
       grid.size(),idx.size(),idx.size()/3);fflush(stdout);
 RENDERDOC_API_1_6_0* rd=nullptr;
 HMODULE module=GetModuleHandleA("renderdoc.dll");
 if(!module){
   printf("X32_RENDDOC_INJECTION not_preloaded\n");
 }else{
   pRENDERDOC_GetAPI api=(pRENDERDOC_GetAPI)GetProcAddress(module,"RENDERDOC_GetAPI");
   if(api && api(eRENDERDOC_API_Version_1_6_0,(void**)&rd)==1 && rd){
     int maj=0,min=0,pat=0;rd->GetAPIVersion(&maj,&min,&pat);
     printf("X32_RENDERDOC_API %d.%d.%d\n",maj,min,pat);
     rd->SetCaptureFilePathTemplate(captureTemplate);
     printf("X32_CAPTPL %s\n",captureTemplate);
   }else printf("X32_RENDERDOC_API_NOT_AVAILABLE\n");
 }
 fflush(stdout);
 auto draw=[&](){
   float clear[4]={.04f,.07f,.14f,1};
   ctx->OMSetRenderTargets(1,&rtv,nullptr);ctx->ClearRenderTargetView(rtv,clear);
   D3D11_VIEWPORT view{};view.Width=768;view.Height=480;view.MaxDepth=1;
   ctx->RSSetViewports(1,&view);ctx->IASetInputLayout(layout);
   ctx->VSSetShader(vs,nullptr,0);ctx->PSSetShader(ps,nullptr,0);
   UINT stride=sizeof(Vertex),offset=0;
   ctx->IASetVertexBuffers(0,1,&gv,&stride,&offset);ctx->IASetIndexBuffer(gi,DXGI_FORMAT_R16_UINT,0);
   ctx->IASetPrimitiveTopology(D3D11_PRIMITIVE_TOPOLOGY_TRIANGLELIST);
   ctx->DrawIndexed((UINT)idx.size(),0,0);
   ctx->IASetVertexBuffers(0,1,&pv,&stride,&offset);ctx->IASetPrimitiveTopology(D3D11_PRIMITIVE_TOPOLOGY_POINTLIST);ctx->Draw(5,0);
   ctx->IASetVertexBuffers(0,1,&tv,&stride,&offset);
   ctx->IASetPrimitiveTopology(D3D11_PRIMITIVE_TOPOLOGY_TRIANGLELIST);ctx->DrawInstanced(3,3,0,0);
   sc->Present(0,0);
 };
 MSG msg{};for(int frame=0;frame<25;frame++){
   while(PeekMessage(&msg,nullptr,0,0,PM_REMOVE)){TranslateMessage(&msg);DispatchMessage(&msg);}
   if(rd && frame==8)rd->StartFrameCapture((RENDERDOC_DevicePointer)dev,(RENDERDOC_WindowHandle)hw);
   draw();
   if(rd && frame==8){
     unsigned done=rd->EndFrameCapture((RENDERDOC_DevicePointer)dev,(RENDERDOC_WindowHandle)hw);
     printf("X32_CAPTURE_END result=%u numCaptures=%u\n",done,rd->GetNumCaptures());fflush(stdout);
   }
   Sleep(70);
 }
 if(rd){
   printf("X32_CAPTURE_TOTAL %u\n",rd->GetNumCaptures());
   for(uint32_t i=0;i<rd->GetNumCaptures();i++){
     uint32_t len=0;uint64_t stamp=0;rd->GetCapture(i,nullptr,&len,&stamp);
     std::vector<char> path(len+5,0);
     if(rd->GetCapture(i,path.data(),&len,&stamp))
       printf("X32_CAPTURE_FILE %s\n",path.data());
   }
 }else puts("X32_NO_RENDOC_API_NO_CAPTURE");
 clearObj(tv);clearObj(pv);clearObj(gi);clearObj(gv);clearObj(layout);clearObj(ps);clearObj(vs);
 clearObj(rtv);clearObj(sc);clearObj(ctx);clearObj(dev);DestroyWindow(hw);
 fflush(stdout);return rd && rd->GetNumCaptures()>0?0:30;
}
